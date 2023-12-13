import dynamic from 'next/dynamic';

export const MDXEditor = dynamic(() => import('./InitializedMDXEditor'), {
  ssr: false,
});
