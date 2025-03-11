import { NavBarLinks } from './NavbarLinks';
import { SearchBar } from './SearchBar';
import { ThemeButton } from './ThemeButton';
export const NavBar = () => {
  return (
    <div className="flex flex-row border-red-400 border-2 w-full h-[10%] gap-3 items-center justify-center">
      <NavBarLinks href="/" title={'Coins'} />
      <NavBarLinks href="dashboard/portfolio" title={'Portfolio'} />
      <div className="flex flex-grow ml-[30%] h-[90%] items-center gap-4">
        <SearchBar />
        <ThemeButton />
      </div>
    </div>
  );
};
