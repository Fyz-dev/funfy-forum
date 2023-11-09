'use client';

import { FC, useEffect } from 'react';
import { useSwitch, VisuallyHidden, SwitchProps } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { MoonIcon, SunIcon } from 'src/assets/icons';

const ThemeSwitcher: FC<SwitchProps> = props => {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(isSelected ? 'light' : 'dark');
  }, [isSelected]);

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
              'rounded-lg transition-all hover:bg-default/40',
            ],
          })}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={isSelected ? 'sun' : 'moon'}
              initial={{ x: '-200%' }}
              animate={{ x: 0 }}
              exit={{ x: '200%' }}
            >
              {isSelected ? <SunIcon /> : <MoonIcon />}
            </motion.div>
          </AnimatePresence>
        </div>
      </Component>
    </div>
  );
};

export default ThemeSwitcher;
