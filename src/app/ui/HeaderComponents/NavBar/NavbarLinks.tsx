import Link from 'next/link';
import { useSelector } from 'react-redux';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const NavBarLinks = ({
  href,
  title,
}: {
  href: string;
  title: string;
}) => {
  const nightMode = useSelector((state) => state.themeReducer.nightMode);
  const color = nightMode ? 'outline' : 'secondary';

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: color }),
        'flex h-[8vh] flex-grow sm:text-xl p-4 sm:w-[90%] sm:h-[80%]'
      )}
    >
      {title}
    </Link>
  );
};
