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
            ? 'bg-indigo-400 dark:bg-indigo-700/90 border-none text-white'
            : 'hover:bg-[var(--hover)] border-0'
        } ${py || ''} rounded-md border-`}
      >
        {children}
      </div>
    </div>
  );
};

export default SelectedButton;
