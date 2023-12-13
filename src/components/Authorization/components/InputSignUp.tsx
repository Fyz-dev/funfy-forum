import { FC } from 'react';
import Login from './InputLogin';
import Input from 'src/components/ui/Input/Input';
import { Person } from 'src/assets/icons';

const SignUp: FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <Input
        name="name"
        endContent={<Person />}
        variant="bordered"
        type="text"
        label="Name"
      />
      <Login />
    </div>
  );
};

export default SignUp;
