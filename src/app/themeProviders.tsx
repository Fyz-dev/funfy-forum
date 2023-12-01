'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider, useTheme } from 'next-themes';

export default function ThemeProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
