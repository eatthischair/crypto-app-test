import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNum = (num) => {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumSignificantDigits: 3,
  }).format(num);
};

export function formatPrice(num) {
  return new Intl.NumberFormat('en', {
    maximumSignificantDigits: 11,
  }).format(num);
}

export const numToPrice = (num) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const formattedNumber = formatter.format(num);
  return formattedNumber;
};

export const formatPriceChange = (num) => {
  if (num === null) return;
  num = Number(num).toFixed(2);
  const isPositive = Math.sign(num);
  const formatted = isPositive === 1 ? <FaCaretUp /> : <FaCaretDown />;
  const color = isPositive === 1 ? 'text-[#00c9be]' : 'text-[#f2015d]';
  num = isPositive === 1 ? num : Math.abs(num);

  const classNameString = `flex items-center gap-1 ${color}`;
  return (
    <div className={classNameString}>
      {formatted}
      {num}%
    </div>
  );
};
