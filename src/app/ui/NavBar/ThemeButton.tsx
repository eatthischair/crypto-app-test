'use client';
import { MdOutlineLightMode } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
//later implement conditionally switching icons with
import { MdModeNight } from 'react-icons/md';
import { themeSwitch } from '@/app/features/themeSlice';
export const ThemeButton = () => {
  const nightMode = useSelector((state) => state.themeReducer.nightMode);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(themeSwitch())}
      className="border-red-800 border-2 rounded-md w-[10%] h-[60%]"
    >
      {nightMode ? (
        <MdOutlineLightMode className="w-full h-full" />
      ) : (
        <MdModeNight fill="black" className="w-full h-full" />
      )}
    </button>
  );
};
