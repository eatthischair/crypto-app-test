'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { HeaderComponents } from './ui/HeaderComponents';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './ui/Components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="sm:w-full sm:h-full sm:p-12 m-0">
          <QueryClientProvider client={queryClient}>
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
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}
