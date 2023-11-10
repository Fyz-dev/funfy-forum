import { FC, useEffect } from 'react';
import {
  Input as NextuiInput,
  InputProps as NextuiInputProps,
} from '@nextui-org/input';
import { useFormContext } from 'react-hook-form';
import findInputError from './utils/findInputError';

type InputProps = {
  name: string | undefined;
} & NextuiInputProps;

const Input: FC<InputProps> = ({
  name,
  label,
  isRequired = false,
  variant = 'flat',
  ...rest
}) => {
  const {
    register,
    unregister,
    formState: { errors },
  } = useFormContext();

  const error = findInputError(errors, name);

  useEffect(() => {
    return () => {
      unregister(name);
    };
  }, [name, unregister]);

  return (
    <NextuiInput
      isRequired={isRequired}
      variant={variant}
      label={label}
      errorMessage={error?.error?.message || ''}
      {...register(name || '', { required: isRequired })}
      {...rest}
    />
  );
};

export default Input;
