import { NavBarLinks } from './NavbarLinks';
import { SearchBar } from './SearchBar';
import { ThemeButton } from './ThemeButton';
import { CurrencySwitch } from './CurrencySwitch';
export const NavBar = () => {
  return (
    <div className="flex flex-row w-[100%] h-[10%] gap-3 items-center">
      <div className="flex gap-5 ml-5">
        <NavBarLinks href="/" title={'Coins'} />
        <NavBarLinks href="dashboard/portfolio" title={'Portfolio'} />
      </div>
      <div className="flex flex-grow ml-[50%] mr-5 h-[90%] items-center gap-4">
        <SearchBar />
        <CurrencySwitch />
        <ThemeButton />
      </div>
    </div>
  );
};
