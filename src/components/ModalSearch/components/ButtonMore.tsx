import { Button } from '@nextui-org/button';
import { FC } from 'react';

const ButtonMore: FC<{ fc: () => void }> = ({ fc }) => {
  return (
    <Button
      variant="flat"
      color="primary"
      radius="full"
      className="mr-auto"
      onClick={fc}
    >
      More...
    </Button>
  );
};
export default ButtonMore;
