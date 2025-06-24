// import { LineChart } from './Charts/LineChart';
// import { BarChart } from './Charts/BarChart';
// import { CoinTable } from './CoinTable/CoinTable';
// import { LoadingSpinner } from '@/components/ui/loadingSpinner';
// import { getChartData } from '@/app/api/getChartData';
// import { Suspense } from 'react';

// export async function HomePage() {
//   const chartData = await getChartData('bitcoin');
//   if (!chartData) return <LoadingSpinner />;

//   const today = new Date();
//   const formattedDate = today.toLocaleDateString('en-US', {
//     month: 'short',
//     day: '2-digit',
//     year: 'numeric',
//   });
//   return (
//     <>
//       <h2 className="flex w-full gap-8 p-4 justify-center flex-grow">
//         Your Overview
//       </h2>
//       <div className="w-full grid grid-cols-1 grid-rows-2 gap-6 p-4 sm:flex sm:h-3/5 sm:gap-8 sm:justify-center sm:flex-grow ">
//         <div className="sm:h-3/5 w-full h-64">
//           <LineChart pricesData={chartData} formattedDate={formattedDate} />
//         </div>
//         <div className="sm:h-3/5 w-full h-64">
//           <BarChart pricesData={chartData} formattedDate={formattedDate} />
//         </div>
//       </div>
//       <div>
//         <Suspense>
//           <CoinTable />
//         </Suspense>
//       </div>
//     </>
//   );
// }
