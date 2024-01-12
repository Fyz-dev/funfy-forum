import 'src/styles/globals.css';
import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';
import { ReactNode } from 'react';
import Header from 'src/components/Header';
import { AuthContextProvider } from 'src/context/Auth';
import ToastProviders from 'src/providers/ToastProviders';
import ThemeProviders from 'src/providers/ThemeProviders';

// const font = Inter({ subsets: ['latin'] });

const font = Roboto_Flex({
  weight: '500',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Funfy-forum',
  description:
    'Funfy Forum is your go-to online community for lively discussions on various topics.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={font.className}>
        <AuthContextProvider>
          <ThemeProviders>
            <ToastProviders>
              <Header />
              {children}
            </ToastProviders>
          </ThemeProviders>
        </AuthContextProvider>
      </body>
    </html>
  );
}
