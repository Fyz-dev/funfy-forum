import { FC } from 'react';
import { Post } from 'src/components/Post';
import { IPost } from 'src/interface';

const Posts: FC<{ posts: ResponsData<IPost> }> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-2">
      {posts.data.map(post => (
        <Post
          key={post.id}
          post={post}
          classNames={{
            card: 'hover:bg-default-200 hover:scale-[1.01] bg-default-100 shadow-none',
          }}
          hideDescription
        />
      ))}
    </div>
  );
};

export default Posts;
