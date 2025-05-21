'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { HeaderComponents } from './ui/HeaderComponents';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './ui/Components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="w-screen h-screen p-12">
          <Provider store={store}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <HeaderComponents />
              {children}
            </ThemeProvider>
          </Provider>
        </div>
      </body>
    </html>
  );
}
