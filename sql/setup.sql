--
-- Name: get_comment_count(uuid[]); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_comment_count(post_ids uuid[]) RETURNS TABLE(post_id uuid, "countComments" bigint)
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
DECLARE
    item_id uuid;
begin
    for item_id in select unnest(post_ids)
    LOOP
        RETURN QUERY
            SELECT c.post_id, COUNT(*) as "countComments"
            FROM comments c
            WHERE c.post_id = item_id
            GROUP BY c.post_id;
    end LOOP;
end;
$$;


ALTER FUNCTION public.get_comment_count(post_ids uuid[]) OWNER TO postgres;

--
-- Name: get_stats_by_topic(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_stats_by_topic(topic_id_param uuid) RETURNS TABLE(post_count bigint, comment_count bigint, created_at timestamp with time zone)
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
DECLARE
    post_ids uuid[];
BEGIN
    SELECT ARRAY_AGG(p.id) INTO post_ids
    FROM posts p
    WHERE p.topic_id = topic_id_param;

    post_count := (SELECT COUNT(*) FROM unnest(post_ids));

    comment_count := (
        SELECT COUNT(*)
        FROM comments c
        WHERE c.post_id = ANY(post_ids)
    );

    SELECT t.created_at INTO created_at
    FROM topics t
    WHERE t.id = topic_id_param;

    RETURN NEXT;
END;
$$;


ALTER FUNCTION public.get_stats_by_topic(topic_id_param uuid) OWNER TO postgres;

--
-- Name: get_stats_by_user(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_stats_by_user(user_id_param uuid) RETURNS TABLE(post_count bigint, comment_count bigint, created_at timestamp with time zone)
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
    SELECT COUNT(*) INTO post_count
    FROM posts p
    WHERE p.user_id = user_id_param;

    SELECT COUNT(*) INTO comment_count
    FROM comments c
    WHERE c.user_id = user_id_param;

    SELECT u.created_at INTO created_at
    FROM users u
    WHERE u.id = user_id_param;

    RETURN NEXT;
END;
$$;


ALTER FUNCTION public.get_stats_by_user(user_id_param uuid) OWNER TO postgres;

--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
begin
  insert into public.users (id, name, email, photo_url, is_blocked, created_at)
  values(
  new.id, 
  coalesce(new.raw_user_meta_data->>'full_name', new.email),   
  new.email,
  new.raw_user_meta_data->>'avatar_url',
  false,
  new.created_at
  );

  return new;
end;
$$;


ALTER FUNCTION public.handle_new_user() OWNER TO postgres;

--
-- Name: comment_with_vote; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.comment_with_vote AS
SELECT
    NULL::bigint AS id,
    NULL::uuid AS user_id,
    NULL::uuid AS post_id,
    NULL::bigint AS parent_comment_id,
    NULL::jsonb AS users,
    NULL::text AS content,
    NULL::bigint AS "voteCount",
    NULL::integer AS "userVote",
    NULL::timestamp with time zone AS created_at;


ALTER VIEW public.comment_with_vote OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    content text,
    image_url character varying,
    user_id uuid NOT NULL,
    topic_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    is_nsfw boolean DEFAULT false NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: topics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topics (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    description text,
    user_id uuid NOT NULL,
    photo_url character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.topics OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT auth.uid() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    photo_url character varying,
    description character varying,
    is_blocked boolean DEFAULT false NOT NULL,
    social_networks jsonb[],
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT users_description_check CHECK ((length((description)::text) <= 300))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: comment_linear; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.comment_linear AS
 SELECT cv.id,
    cv.user_id,
    cv.post_id,
    cv.parent_comment_id,
    cv.users,
    cv.content,
    cv."voteCount",
    cv."userVote",
    cv.created_at,
    ((to_jsonb(p.*) || jsonb_build_object('users', to_jsonb(u.*))) || jsonb_build_object('topics', to_jsonb(t.*))) AS posts
   FROM (((public.comment_with_vote cv
     JOIN public.users u ON ((cv.user_id = u.id)))
     JOIN public.posts p ON ((cv.post_id = p.id)))
     JOIN public.topics t ON ((p.topic_id = t.id)))
  GROUP BY cv.id, cv.user_id, cv.post_id, cv.parent_comment_id, cv.users, cv.content, cv."voteCount", cv."userVote", cv.created_at, ((to_jsonb(p.*) || jsonb_build_object('users', to_jsonb(u.*))) || jsonb_build_object('topics', to_jsonb(t.*)));


ALTER VIEW public.comment_linear OWNER TO postgres;

--
-- Name: comment_tree; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.comment_tree AS
 WITH RECURSIVE comment_tree(id, user_id, post_id, parent_comment_id, users, content, "voteCount", "userVote", created_at, path, "pathSortOld", "pathSortNew", "pathSortBest", "pathSortControversial") AS (
         SELECT comment_with_vote.id,
            comment_with_vote.user_id,
            comment_with_vote.post_id,
            comment_with_vote.parent_comment_id,
            comment_with_vote.users,
            comment_with_vote.content,
            comment_with_vote."voteCount",
            comment_with_vote."userVote",
            comment_with_vote.created_at,
            ARRAY[comment_with_vote.id] AS path,
            ARRAY[(0)::bigint, (EXTRACT(epoch FROM comment_with_vote.created_at))::bigint, comment_with_vote.id] AS "pathSortOld",
            ARRAY[(0)::bigint, (- (EXTRACT(epoch FROM comment_with_vote.created_at))::bigint), comment_with_vote.id] AS "pathSortNew",
            ARRAY[(0)::bigint, (- comment_with_vote."voteCount"), comment_with_vote.id] AS "pathSortBest",
            ARRAY[(0)::bigint, comment_with_vote."voteCount", comment_with_vote.id] AS "pathSortControversial"
           FROM public.comment_with_vote
          WHERE (comment_with_vote.parent_comment_id IS NULL)
        UNION
         SELECT cv.id,
            cv.user_id,
            cv.post_id,
            cv.parent_comment_id,
            cv.users,
            cv.content,
            cv."voteCount",
            cv."userVote",
            cv.created_at,
            (ct.path || cv.id) AS path,
            ((ct."pathSortOld" || (EXTRACT(epoch FROM cv.created_at))::bigint) || cv.id) AS "pathSortOld",
            ((ct."pathSortNew" || (- (EXTRACT(epoch FROM cv.created_at))::bigint)) || cv.id) AS "pathSortNew",
            ((ct."pathSortBest" || (- cv."voteCount")) || cv.id) AS "pathSortBest",
            ((ct."pathSortControversial" || cv."voteCount") || cv.id) AS "pathSortControversial"
           FROM (public.comment_with_vote cv
             JOIN comment_tree ct ON ((ct.id = cv.parent_comment_id)))
        )
 SELECT comment_tree.id,
    comment_tree.user_id,
    comment_tree.post_id,
    comment_tree.parent_comment_id,
    comment_tree.users,
    comment_tree.content,
    comment_tree."voteCount",
    comment_tree."userVote",
    comment_tree.created_at,
    comment_tree.path,
    comment_tree."pathSortOld",
    comment_tree."pathSortNew",
    comment_tree."pathSortBest",
    comment_tree."pathSortControversial"
   FROM comment_tree;


ALTER VIEW public.comment_tree OWNER TO postgres;

--
-- Name: comment_votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment_votes (
    comment_id bigint NOT NULL,
    user_id uuid NOT NULL,
    vote smallint DEFAULT '0'::smallint,
    CONSTRAINT comment_votes_vote_check CHECK ((vote = ANY (ARRAY[0, 1, '-1'::integer])))
);


ALTER TABLE public.comment_votes OWNER TO postgres;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id bigint NOT NULL,
    user_id uuid NOT NULL,
    post_id uuid NOT NULL,
    parent_comment_id bigint,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.comments ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: comment_votes comment_votes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_votes
    ADD CONSTRAINT comment_votes_pkey PRIMARY KEY (comment_id, user_id);


--
-- Name: comments comments_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_id_key UNIQUE (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: topics topic_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topic_name_key UNIQUE (name);


--
-- Name: topics topic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topic_pkey PRIMARY KEY (id);


--
-- Name: users users_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_key UNIQUE (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comment_with_vote _RETURN; Type: RULE; Schema: public; Owner: postgres
--

CREATE OR REPLACE VIEW public.comment_with_vote AS
 SELECT c.id,
    c.user_id,
    c.post_id,
    c.parent_comment_id,
    to_jsonb(u.*) AS users,
    c.content,
    COALESCE(sum(cv.vote), (0)::bigint) AS "voteCount",
    COALESCE((( SELECT v.vote
           FROM public.comment_votes v
          WHERE ((auth.uid() = v.user_id) AND (c.id = v.comment_id))))::integer, 0) AS "userVote",
    c.created_at
   FROM ((public.users u
     JOIN public.comments c ON ((u.id = c.user_id)))
     LEFT JOIN public.comment_votes cv ON ((c.id = cv.comment_id)))
  GROUP BY c.id, (to_jsonb(u.*));


--
-- Name: comment_votes comment_votes_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_votes
    ADD CONSTRAINT comment_votes_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comment_votes comment_votes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment_votes
    ADD CONSTRAINT comment_votes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: posts posts_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: topics topics_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comment_votes Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users only" ON public.comment_votes FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: comments Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users only" ON public.comments FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: posts Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users only" ON public.posts FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: topics Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for authenticated users only" ON public.topics FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: comment_votes Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.comment_votes FOR SELECT USING (true);


--
-- Name: comments Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.comments FOR SELECT USING (true);


--
-- Name: posts Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.posts FOR SELECT USING (true);


--
-- Name: topics Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.topics FOR SELECT USING (true);


--
-- Name: users Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.users FOR SELECT USING (true);


--
-- Name: comment_votes Enable update for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable update for users based on user_id" ON public.comment_votes FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- Name: comments Enable update for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable update for users based on user_id" ON public.comments FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- Name: posts Enable update for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable update for users based on user_id" ON public.posts FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- Name: topics Enable update for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable update for users based on user_id" ON public.topics FOR UPDATE TO authenticated USING ((auth.uid() = user_id)) WITH CHECK ((auth.uid() = user_id));


--
-- Name: users Enable update for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable update for users based on user_id" ON public.users FOR UPDATE TO authenticated USING ((auth.uid() = id)) WITH CHECK ((auth.uid() = id));


--
-- Name: comment_votes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.comment_votes ENABLE ROW LEVEL SECURITY;

--
-- Name: comments; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

--
-- Name: posts; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

--
-- Name: topics; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
