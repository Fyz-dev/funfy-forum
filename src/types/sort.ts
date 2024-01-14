export type TSortPost = 'new' | 'old';
export type TSortComments = TSortPost | 'best' | 'controversial';
export type TSortCommentsUser = Exclude<TSortComments, 'controversial'>;
export type TSortTopic = 'new' | 'old';
