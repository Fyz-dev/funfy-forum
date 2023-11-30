'use client';

import { forwardRef, useEffect } from 'react';
import { useCheckbox, CheckboxProps } from '@nextui-org/checkbox';
import { VisuallyHidden } from '@nextui-org/react';
import { Chip } from '@nextui-org/chip';
import { Check, Plus } from 'src/assets/icons';
import checkboxStyles from './styles';
import { useFormContext } from 'react-hook-form';

type ITagSwitch = {
  name: string;
  text: string;
} & CheckboxProps;

const TagSwitch = forwardRef<HTMLLabelElement, ITagSwitch>(
  ({ name, text, ...rest }, ref) => {
    const {
      isSelected,
      isFocusVisible,
      getBaseProps,
      getLabelProps,
      getInputProps,
    } = useCheckbox(rest);
    const { setValue } = useFormContext();

    const styles = checkboxStyles({ isSelected, isFocusVisible });

    useEffect(() => {
      setValue(name, isSelected);
    }, [isSelected, name, setValue]);

    return (
      <label {...getBaseProps()} ref={ref}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <Chip
          classNames={{
            base: styles.base(),
            content: styles.content(),
          }}
          size="lg"
          startContent={
            isSelected ? <Check className="fill-content1" /> : <Plus />
          }
          variant="faded"
          {...getLabelProps()}
        >
          {text}
        </Chip>
      </label>
    );
  },
);

TagSwitch.displayName = 'TagSwitch';

export default TagSwitch;
