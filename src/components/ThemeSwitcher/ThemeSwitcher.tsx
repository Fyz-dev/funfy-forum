'use client';

import { FC, useEffect, useState } from 'react';
import { SwitchProps, useSwitch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { MoonIcon, SunIcon } from 'src/assets/icons';
import { BaseSwitch } from 'src/components/ThemeSwitcher/BaseSwitch';

const ThemeSwitcher: FC<SwitchProps> = props => {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const isLightTheme =
    theme === 'system' ? resolvedTheme === 'light' : theme === 'light';

  const [mounted, setMounted] = useState(false);
  const { ...restProps } = useSwitch({
    ...props,
    onValueChange: () => {
      setTheme(isLightTheme ? 'dark' : 'light');
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <BaseSwitch
      {...restProps}
      classNameLabel={[
        'h-unit-10 w-unit-10 overflow-hidden group',
        'flex items-center justify-center',
        'rounded-lg transition-all hover:bg-default/40',
      ]}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={isLightTheme ? 'sun' : 'moon'}
          initial={{ x: '-200%' }}
          animate={{ x: 0 }}
          exit={{ x: '200%' }}
        >
          <div className="transition group-hover:scale-110">
            {isLightTheme ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </BaseSwitch>
  );
};

export default ThemeSwitcher;
