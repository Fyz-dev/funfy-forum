'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export default function ThemeProviders({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
