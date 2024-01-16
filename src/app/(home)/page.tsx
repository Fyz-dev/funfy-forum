import { getPosts } from 'src/api/supabase';
import { InfinitePosts } from 'src/components/InfiniteScroll';

export default async function Home() {
  return (
    <div className="m-3 flex justify-center sm:m-5">
      <main className="flex w-full max-w-smpage flex-col items-start gap-3 sm:gap-5">
        <InfinitePosts sort="new" startPage={1} sizePage={5} fc={getPosts} />
      </main>
    </div>
  );
}
