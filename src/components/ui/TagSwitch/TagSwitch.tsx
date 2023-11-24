'use client';

import { FC } from 'react';
import { useCheckbox, CheckboxProps } from '@nextui-org/checkbox';
import { VisuallyHidden } from '@nextui-org/react';
import { Chip } from '@nextui-org/chip';
import { Check, Plus } from 'src/assets/icons';
import checkboxStyles from './styles';

type ITagSwitch = {
  text: string;
} & CheckboxProps;

const TagSwitch: FC<ITagSwitch> = ({ text, ...rest }) => {
  const {
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox(rest);

  const styles = checkboxStyles({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
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
};

export default TagSwitch;
