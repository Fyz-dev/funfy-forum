'use client';

import { FC } from 'react';
import { useSwitch, VisuallyHidden, SwitchProps } from '@nextui-org/react';
import { BsSunFill as SunIcon, BsMoonFill as MoonIcon } from 'react-icons/bs';
import { AnimatePresence, motion } from 'framer-motion';

const ThemeSwitcher: FC<SwitchProps> = props => {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  const animationProps = {
    initial: { x: '-200%' },
    animate: { x: 0 },
    exit: { x: '200%' },
  };

  return (
    <div>
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.label({
            class: [
              'h-8 w-8 overflow-hidden',
              'flex items-center justify-center',
              'rounded-lg hover:bg-default-50',
            ],
          })}
        >
          <AnimatePresence mode="popLayout">
            {isSelected ? (
              <motion.div key="sun" {...animationProps}>
                <SunIcon />
              </motion.div>
            ) : (
              <motion.div key="moon" {...animationProps}>
                <MoonIcon />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Component>
    </div>
  );
};

export default ThemeSwitcher;
