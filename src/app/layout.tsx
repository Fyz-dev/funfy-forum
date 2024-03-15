import 'src/styles/globals.css';
import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';
import { ReactNode } from 'react';
import Header from 'src/components/Header';
import { AuthContextProvider } from 'src/context/Auth';
import ThemeProviders from 'src/providers/ThemeProviders';
import ToastProviders from 'src/providers/ToastProviders';
import { ModalAuthContextProvider } from 'src/context/ModalAuth';

// const font = Inter({ subsets: ['latin'] });

const font = Roboto_Flex({
  weight: ['400', '500', '600', '700'],
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
        <ThemeProviders>
          <AuthContextProvider>
            <ToastProviders>
              <ModalAuthContextProvider>
                <Header />
                {children}
              </ModalAuthContextProvider>
            </ToastProviders>
          </AuthContextProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}
