import { getPosts } from 'src/api/supabase';
import Posts from 'src/components/Posts';

export default async function Home() {
  const posts = await getPosts('new');

  return (
    <div className="m-3 flex justify-center sm:m-5">
      <main className="flex w-full max-w-smpage flex-col items-start gap-3 sm:gap-5">
        {posts && <Posts posts={posts} />}
      </main>
    </div>
  );
}
