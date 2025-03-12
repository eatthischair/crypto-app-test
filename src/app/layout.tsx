'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { NavBar } from './ui/NavBar/Navbar';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './ui/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="w-screen h-screen">
          <Provider store={store}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavBar />
              {children}
            </ThemeProvider>
          </Provider>
        </div>
      </body>
    </html>
  );
}
