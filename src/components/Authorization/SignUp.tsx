import { FC } from 'react';
import { Input } from '@nextui-org/input';
import { MdPerson } from 'react-icons/md';
import Login from './Login';

const SignUp: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <Input
        isRequired
        endContent={<MdPerson />}
        variant="bordered"
        type="text"
        label="Name"
      />
      <Login />
    </div>
  );
};

export default SignUp;
