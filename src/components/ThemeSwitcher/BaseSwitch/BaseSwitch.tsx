import { FC, ReactNode } from 'react';
import { useSwitch } from '@nextui-org/switch';
import { VisuallyHidden } from '@nextui-org/react';
import { ClassValue } from 'tailwind-variants';

type TypeSwitch = {
  classNameLabel?: ClassValue;
  children: ReactNode;
} & Pick<
  ReturnType<typeof useSwitch>,
  'Component' | 'slots' | 'getBaseProps' | 'getInputProps' | 'getWrapperProps'
>;

const BaseSwitch: FC<TypeSwitch> = ({
  Component,
  slots,
  getBaseProps,
  getInputProps,
  getWrapperProps,
  classNameLabel,
  children,
}) => {
  return (
    <div>
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.label({
            class: classNameLabel,
          })}
        >
          {children}
        </div>
      </Component>
    </div>
  );
};

export default BaseSwitch;
