import { Button, ButtonProps } from '@nextui-org/button';
import { FC } from 'react';
import { ArrowDown } from 'src/assets/icons';

interface DropDownFilterProps {
  className?: string;
  size?: ButtonProps['size'];
}

const DropDownFilter: FC<DropDownFilterProps> = ({ className, size }) => {
  return (
    <Button
      size={size}
      radius="full"
      variant="light"
      className={`gap-1 ${className}`}
    >
      <span>Best</span>
      <ArrowDown />
    </Button>
  );
};

export default DropDownFilter;
