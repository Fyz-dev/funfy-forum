export const toCreatPost = () => '/post/create/';
export const toCreatTopic = () => '/create/topic';

export const toProfileSetting = () => '/settings/profile';

export const toTopic = (id: string) => `/topic/${id}`;
export const toUser = (id: string) => `/user/${id}`;
export const toPost = (id: string) => `/post/${id}/`;
export const toPostSectionComment = (id: string) => `/post/${id}#comments`;
export const toCommentsPost = (postId: string, commentId: number) =>
  `/post/${postId}/comment/${commentId}#comments`;
