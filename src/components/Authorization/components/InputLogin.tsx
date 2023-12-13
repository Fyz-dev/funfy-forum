'use client';

import { FC, useState } from 'react';
import { Email, VisibilityOn, VisibilityOff } from 'src/assets/icons';
import Input from 'src/components/ui/Input/Input';

const InputSignUp: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex flex-col gap-3">
      <Input
        name="email"
        variant="bordered"
        type="email"
        label="Email"
        endContent={<Email />}
      />
      <Input
        name="password"
        variant="bordered"
        type={isVisible ? 'text' : 'password'}
        label="Password"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? <VisibilityOn /> : <VisibilityOff />}
          </button>
        }
      />
    </div>
  );
};

export default InputSignUp;
