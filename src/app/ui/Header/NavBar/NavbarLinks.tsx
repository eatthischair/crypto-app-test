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
        'flex h-[8vh] sm:text-xl p-4 px-0 sm:w-[90%] sm:h-[80%] border-0'
      )}
    >
      {icon}
      {title}
    </Link>
  );
};
