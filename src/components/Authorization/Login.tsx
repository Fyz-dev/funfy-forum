'use client';

import { FC, useState } from 'react';
import { Input } from '@nextui-org/input';
import { MdEmail, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Login: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex flex-col gap-3">
      <Input
        isRequired
        endContent={<MdEmail />}
        variant="bordered"
        type="email"
        label="Email"
      />
      <Input
        isRequired
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? <MdVisibility /> : <MdVisibilityOff />}
          </button>
        }
        variant="bordered"
        type={isVisible ? 'text' : 'password'}
        label="Password"
      />
    </div>
  );
};

export default Login;
