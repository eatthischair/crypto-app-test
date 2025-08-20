'use client';
import { CgSortZa, CgSortAz } from 'react-icons/cg';
import { useState } from 'react';

export const HeaderButton = ({ text, index, toggleState, filterCoins }) => {
  const [toggled, setToggled] = useState(toggleState[index - 1] || false);

  const updateToggleState = () => {
    setToggled(!toggled);
    const newToggleState = Array(5).fill(null);
    newToggleState[index] = toggled === null ? false : !toggled;
    filterCoins(newToggleState);
  };

  if (index >= 0 && index <= 4) {
    return (
      <div>
        <button
          className="pl-2 flex flex-row items-center break-words cursor-pointer"
          onClick={updateToggleState}
        >
          <span className="justify-center">{text}</span>
          <span>
            {toggled ? <CgSortZa size={30} /> : <CgSortAz size={30} />}
          </span>
        </button>
      </div>
    );
  } else return <div className="">{text}</div>;
};
