'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { NavBar } from './ui/NavBar/Navbar';
// import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
// import { theme } from './ui/theme';
import { store } from './store';
import { Theme } from './ui/Theme/Theme';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Theme>
            <NavBar />
            {children}
          </Theme>
        </Provider>
      </body>
    </html>
  );
}
