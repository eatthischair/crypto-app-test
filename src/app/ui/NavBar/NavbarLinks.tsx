import Link from 'next/link';
import { StyledA } from './Link';
import { useSelector } from 'react-redux';

export const NavBarLinks = ({
  href,
  title,
}: {
  href: string;
  title: string;
}) => {
  const nightMode = useSelector((state) => state.themeReducer.nightMode);
  const color = nightMode ? 'white' : 'black';

  return (
    <Link href={href} legacyBehavior={true}>
      <StyledA href={href} theme={{ main: color }}>
        {title}
      </StyledA>
    </Link>
  );
};
