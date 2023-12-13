import { FC } from 'react';
import { IPosts } from 'src/interface';
import { Post } from '../Post';

const Posts: FC<{ posts: IPosts }> = ({ posts }) => {
  return (
    <>
      {posts.map(item => {
        return <Post key={item.id} post={item} />;
      })}
    </>
  );
};

export default Posts;
