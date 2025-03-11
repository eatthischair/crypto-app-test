import { useSelector } from 'react-redux';

export const SearchBar = () => {
  const nightMode = useSelector((state) => state.themeReducer.nightMode);

  return (
    <input
      placeholder="Search..."
      className="w-[90%] h-[70%] border-red-400 border-2 rounded-md text-black"
    />
  );
};
