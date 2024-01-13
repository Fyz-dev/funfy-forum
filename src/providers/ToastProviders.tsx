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
    <div>
      {children}
      <Toaster
        position={isDesktop ? 'bottom-right' : 'top-center'}
        toastOptions={{
          success: {
            className: 'toast-success',
          },
          error: {
            className: 'toast-error',
          },
          loading: {
            className: 'toast-loading',
          },
        }}
        containerStyle={{ top: '4.5rem' }}
      />
    </div>
  );
}
