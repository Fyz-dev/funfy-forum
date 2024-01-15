import { FC } from 'react';
import { IPost } from 'src/interface';
import { Post } from '../Post';

const Posts: FC<{ posts: IPost[] }> = ({ posts }) => {
  return (
    <>
      {posts.map(item => {
        return <Post key={item.id} post={item} />;
      })}
    </>
  );
};

export default Posts;
