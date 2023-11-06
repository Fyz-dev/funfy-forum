'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider, useTheme } from 'next-themes';

export default function ThemeProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme={theme}>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
