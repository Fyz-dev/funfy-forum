'use client';

import { FC, useEffect } from 'react';
import { SwitchProps, useSwitch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { MoonIcon, SunIcon } from 'src/assets/icons';
import { BaseSwitch } from 'src/components/ThemeSwitcher/BaseSwitch';

const ThemeSwitcher: FC<SwitchProps> = props => {
  const { isSelected, ...restProps } = useSwitch(props);

  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(isSelected ? 'light' : 'dark');
  }, [isSelected, setTheme]);

  return (
    <BaseSwitch
      {...restProps}
      classNameLabel={[
        'h-8 w-8 overflow-hidden',
        'flex items-center justify-center',
        'rounded-lg transition-all hover:bg-default/40',
      ]}
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
    </BaseSwitch>
  );
};

export default ThemeSwitcher;
