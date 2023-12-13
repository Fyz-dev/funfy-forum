import { FC } from 'react';

const ErrorMessage: FC<{ message: string }> = ({ message }) => {
  return (
    <div slot="helper-wrapper" className="relative flex flex-col gap-1.5 p-1">
      <div slot="error-message" className="text-tiny text-danger">
        {message}
      </div>
    </div>
  );
};

export default ErrorMessage;
