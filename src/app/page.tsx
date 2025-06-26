import { Suspense } from 'react';
import { HomePage } from './ui/HomePage/HomePage';
import { LoadingSpinner } from '@/components/ui/loadingSpinner';
export default async function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomePage />
    </Suspense>
  );
}
