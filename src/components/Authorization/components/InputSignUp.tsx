import { FC } from 'react';
import { MdPerson } from 'react-icons/md';
import Login from './InputLogin';
import Input from 'src/components/ui/Input/Input';

const SignUp: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <Input
        name="name"
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
