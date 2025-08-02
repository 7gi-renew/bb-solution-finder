import React, { type MouseEventHandler, type ReactNode } from "react";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  disabled?: boolean;
};

export const MoveButton: React.FC<Props> = ({ onClick, children, disabled }) => {
  return (
    <>
      <button className="px-6 py-2 bg-teal-500 text-white font-bold rounded-sm disabled:bg-gray-100 disabled:text-gray-900" disabled={disabled} onClick={onClick!}>
        {children}
      </button>
    </>
  );
};
