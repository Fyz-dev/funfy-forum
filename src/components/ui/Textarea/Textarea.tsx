import { FC, useEffect } from 'react';
import {
  Textarea as NextuiTextArea,
  TextAreaProps as NextuiTextareaProps,
} from '@nextui-org/input';
import { useFormContext } from 'react-hook-form';
import { findInputError } from 'src/utils';

type InputProps = {
  name: string;
} & NextuiTextareaProps;

const Textarea: FC<InputProps> = ({
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

  const { message, isInvalid } = findInputError(errors, name);

  useEffect(() => {
    return () => {
      unregister(name);
    };
  }, [name, unregister]);

  return (
    <NextuiTextArea
      isRequired={isRequired}
      variant={variant}
      label={label}
      isInvalid={isInvalid}
      errorMessage={message}
      {...register(name || '', { required: isRequired })}
      {...rest}
    />
  );
};

export default Textarea;
