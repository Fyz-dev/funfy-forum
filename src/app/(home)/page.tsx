import postController from 'src/api/controller/PostController';
import { Post } from 'src/components/Post';

export default async function Home() {
  const posts = await postController.getAll();

  return (
    <div className="m-3 flex justify-center sm:m-5">
      <main className="flex w-full max-w-smpage flex-col items-start gap-3 sm:gap-5">
        {posts.map(item => {
          return <Post key={item.id} post={item}></Post>;
        })}
      </main>
    </div>
  );
}
