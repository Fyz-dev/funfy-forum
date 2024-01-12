'use client';

import { Toaster } from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';

export default function ToastProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDesktop = useMediaQuery({ minWidth: '640px' });

  return (
    <>
      {children}
      <Toaster
        position={isDesktop ? 'bottom-right' : 'top-center'}
        toastOptions={{
          success: {
            className:
              '!shadow-medium subpixel-antialiased !text-success-700 !bg-success-200',
          },
          error: {
            className:
              '!shadow-medium subpixel-antialiased !text-danger-700 !bg-danger-200',
          },
          loading: {
            className:
              '!shadow-medium subpixel-antialiased !text-foreground !bg-content1',
          },
        }}
        containerStyle={{ top: '4.5rem' }}
      />
    </>
  );
}
