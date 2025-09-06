import { type ReactNode } from 'react';

const SelectedButton = ({ selected, py, children }) => {
  return (
    <div
      className={`p-[0px]
      rounded-md`}
    >
      <div
        className={`${
          selected
            ? 'bg-indigo-400 dark:bg-indigo-700/90 border-none'
            : 'hover:bg-[var(--hover)] border-0'
        } ${py || ''} rounded-md border-`}
      >
        {children}
      </div>
    </div>
  );
};

/*
         ${
           selected
             ? 'bg-gradient-to-b from-indigo-600 to-indigo-500 dark:from-indigo-300 dark:to-indigo-600 shadow-indigo-500 text-white'
             : 'hover:opacity-25 hover:bg-gradient-to-b hover:from-indigo-600 hover:to-indigo-500 hover:dark:from-indigo-300 hover:dark:to-indigo-600'
         }

         */

export default SelectedButton;
