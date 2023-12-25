import {
  IComment,
  ICommentWithPost,
  IPost,
  ITopic,
  IUser,
} from 'src/interface';
import { Tables } from 'src/types';
import {
  TableCommentWithPostWithoutNull,
  TablePost,
  TreeComment,
} from './types';

export const toUser = (user: Tables<'users'>): IUser => {
  return {
    uid: user.id,
    name: user.name,
    email: user.email,
    photoURL: user.photo_url || undefined,
    userDetails: {
      description: user.description || undefined,
      socialNetwork: [],
    },
    isBlocked: user.is_blocked,
  };
};

export const toTopic = (topic: Tables<'topics'>): ITopic => {
  const { id, name, description } = topic;

  return {
    id,
    userID: topic.user_id,
    photoURL: topic.photo_url,
    name,
    description: description || undefined,
  };
};

export const toPost = (post: TablePost): IPost => {
  const { id, title } = post;

  return {
    id,
    user: toUser(post.users),
    topic: toTopic(post.topics),
    title,
    imageURL: post.image_url || undefined,
    content: post.content || undefined,
    isNSFW: post.is_nsfw,
    commentCount: post?.countComments || 0,
    timestamp: {
      createdAt: new Date(post.created_at),
      updatedAt: null,
    },
  };
};

export const toCommentWithPost = (
  comment: TableCommentWithPostWithoutNull,
): ICommentWithPost => {
  const { id, content, voteCount } = comment;

  return {
    id,
    user: toUser(comment.users),
    content,
    voteCount,
    userVote: comment.userVote,
    childComment: [],
    timestamp: {
      createdAt: new Date(comment.created_at),
      updatedAt: null,
    },
    post: toPost(comment.posts),
  };
};

export const toComment = (comment: TreeComment): IComment => {
  return {
    id: comment.data.id,
    user: toUser(comment.data.users),
    content: comment.data.content,
    voteCount: comment.data.voteCount,
    userVote: comment.data.userVote,
    childComment: comment.children.map(comment => {
      return toComment(comment);
    }),
    timestamp: {
      createdAt: new Date(comment.data.created_at),
      updatedAt: null,
    },
    postID: comment.data.post_id,
  };
};
