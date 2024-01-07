import Link from 'next/link';
import { FC } from 'react';

const NotFound: FC = () => {
  return (
    <div className="inset-x-0 flex h-[calc(100vh-4.1rem)] items-center justify-center">
      <div className="m-3 flex items-center gap-10 max-md:flex-col max-md:items-start max-md:gap-4">
        <h1 className="max-dm:text-left text-9xl font-black text-primary max-md:text-7xl">
          404
        </h1>
        <div className="flex h-full flex-col justify-between">
          <p className="mb-4 text-3xl font-bold">Page not found</p>
          <p className="text-xl font-normal">
            Uh oh! Looks like someone got lost...
          </p>
          <p className="text-xl font-normal">
            Please go to the{' '}
            <Link className="text-primary " href="/">
              main page
            </Link>{' '}
            of the site.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
