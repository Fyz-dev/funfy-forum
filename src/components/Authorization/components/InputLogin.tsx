'use client';

import { FC, useState } from 'react';
import { MdEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md';
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
        endContent={<MdEmail />}
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
            {isVisible ? <MdVisibility /> : <MdVisibilityOff />}
          </button>
        }
      />
    </div>
  );
};

export default InputSignUp;
