import { FC } from 'react';

export const withTieToTop = <P extends {}>(WrappedComponent: FC<P>) => {
  const WithTieToTop: FC<P> = ({ ...props }) => {
    return (
      <>
        <div className="absolute top-0" />
        <WrappedComponent {...props} />
      </>
    );
  };

  return WithTieToTop;
};
