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
        'text-xl p-4 w-[90%] h-[80%]'
      )}
    >
      {title}
    </Link>
  );
};
