import Link from 'next/link';
import { useSelector } from 'react-redux';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const NavBarLinks = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
}) => {
  const nightMode = useSelector((state: any) => state.themeReducer.nightMode);
  const color = nightMode ? 'outline' : 'secondary';

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: color }),
        'flex h-12 sm:text-xl p-0 pt-2 px-0 shadow-none border-none hover:text-indigo-400 dark:hover:text-indigo-400 hover:bg-inherit'
      )}
    >
      {icon}
      {title}
    </Link>
  );
};
