import { type ReactNode } from 'react';

const SelectableWrapper = ({
  selected,
  children,
  py,
  shadowSize,
  widthClasses,
  rounded,
  animationStyles,
}) => {
  return (
    <div
      className={`p-[1px] ${widthClasses || ''} ${
        selected
          ? ` bg-gradient-to-b from-indigo-600 to-indigo-500 dark:from-indigo-300 dark:to-indigo-600 shadow-indigo-500 ${
              shadowSize || ''
            } text-white`
          : 'hover:opacity-25 hover:bg-gradient-to-b hover:from-indigo-600 hover:to-indigo-500 hover:dark:from-indigo-300 hover:dark:to-indigo-600'
      }${rounded ? ' rounded-full' : ' rounded-md'} ${animationStyles || ''}`}
    >
      <div
        className={`${
          selected
            ? 'bg-indigo-400 dark:bg-indigo-700/90'
            : 'hover:bg-indigo-400 hover:dark:bg-indigo-700/90'
        } ${py || ''}${rounded ? ' rounded-full' : ' rounded-md'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default SelectableWrapper;
