import {
  IComment,
  ICommentData,
  ICommentWithPost,
  IPost,
  IStats,
  ITopic,
  IUser,
} from 'src/interface';
import { Tables } from 'src/types';
import {
  TableComment,
  TableCommentWithPostWithoutNull,
  TablePost,
  TableTopicStats,
  TableUserStats,
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
    photoURL: topic.photo_url || undefined,
    name,
    description: description || undefined,
    timestamp: {
      createdAt: new Date(topic.created_at),
      updatedAt: null,
    },
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

export const toComment = (comment: TableComment): ICommentData => {
  return {
    id: comment.id,
    user: toUser(comment.users),
    content: comment.content,
    voteCount: comment.voteCount,
    userVote: comment.userVote,
    path: comment.path,
    parentId: comment.parent_comment_id,
    timestamp: {
      createdAt: new Date(comment.created_at),
      updatedAt: null,
    },
    postID: comment.post_id,
  };
};

// childComment: comment.children.map(comment => {
//   return toComment(comment);
// }),

export const toStats = (data: TableTopicStats | TableUserStats): IStats => {
  return {
    cakeDay: new Date(data.created_at),
    countComments: data.comment_count,
    countPosts: data.post_count,
  };
};
