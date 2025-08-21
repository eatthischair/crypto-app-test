'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { HeaderComponents } from './ui/HeaderComponents';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from './ui/Components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

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
        <div className="sm:w-full sm:h-full sm:p-12 m-0 overflow-x-hidden">
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <SkeletonTheme baseColor="var(--background)">
                  <Suspense fallback={<Skeleton count={5} />}>
                    <HeaderComponents />
                  </Suspense>
                  <div className="max-w-[1400px] lg:m-auto">{children}</div>
                </SkeletonTheme>
              </ThemeProvider>
            </Provider>
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}
