'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { formatPriceChange, formatPrice, formatNum } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { convert } from '@/app/ui/Header/NavBar/convert';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export const ChartButtonsSkeleton = () => {
  return (
    <Carousel>
      <CarouselContent>
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem
            key={index}
            className={`flex flex-row sm:grid grid-cols-[50%_50%] sm:grid-cols-[20%_80%] rounded-xs mx-1 max-h-[15vh] h-full bg-[var(--card)] sm:basis-1/6 basis-1/4 text-nowrap overflow-hidden items-center justify-evenly pl-4 ${
              index === 0 ? 'ml-4' : ''
            }`}
          >
            {/* Desktop Image Skeleton */}
            <div className="hidden sm:flex sm:py-4 py-2">
              <div className="w-[30px] h-[30px] bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
            </div>

            {/* Mobile Image Skeleton */}
            <div className="sm:hidden sm:py-4 py-2 -ml-2 sm:ml-0">
              <div className="w-[20px] h-[20px] bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
            </div>

            <div className="flex items-center sm:grid sm:grid-rows-2 w-full sm:py-2 sm:m-0 sm:p-0 sm:place-self-center text-xl sm:text-base align-middle">
              {/* Desktop Content Skeleton */}
              <div className="justify-start overflow-clip text-nowrap hidden sm:flex items-center">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-16 mr-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-8"></div>
              </div>

              {/* Mobile Symbol Skeleton */}
              <div className="sm:hidden visible px-2 mb-0 flex text-sm">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-10"></div>
              </div>

              {/* Desktop Price/Change Skeleton */}
              <div className="grid-cols-2 justify-self-start font-xs py-0 hidden sm:grid">
                <div className="font-thin m-0 p-0 justify-self-start overflow-clip max-w-[100%]">
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-12"></div>
                </div>
                <div className="justify-self-end">
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-8"></div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
