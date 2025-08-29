'use client';
import React from 'react';
import SelectedButton from './SelectedButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

export const ConverterSwitch = () => {
  const path = usePathname();
  const { theme } = useTheme();
  const lightModeClasses = theme === 'dark' ? '' : 'border';
  const buttonClassName = `px-28 py-4 text-lg font-light light:border rounded-md ${lightModeClasses}`;
  return (
    <div className="py-1 px-0 bg-white dark:bg-violet-900/20 hidden md:flex items-center rounded-md self-start gap-1 my-4 text-indigo-900 dark:text-white">
      <SelectedButton py="py-3" selected={path === '/'}>
        <Link href="/" className="px-28 py-5 text-lg font-light">
          Coins
        </Link>
      </SelectedButton>
      <SelectedButton py="py-3" selected={path === '/converter'}>
        <Link href="/converter" className={buttonClassName}>
          Converter
        </Link>
      </SelectedButton>
    </div>
  );
};
