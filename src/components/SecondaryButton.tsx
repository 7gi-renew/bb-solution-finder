import React, { type MouseEventHandler, type ReactNode } from "react";

type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  disabled?: boolean;
  fullSize: boolean;
};

export const SecondaryButton: React.FC<Props> = ({ onClick, children, disabled, fullSize }) => {
  return (
    <>
      <button className={`py-[12px] text-blue-600 bg-white border-2 border-blue-600 font-bold rounded-[6px]  ${fullSize && `w-full`} hover:opacity-80 disabled:bg-gray-100 disabled:text-gray-900`} disabled={disabled} onClick={onClick!}>
        {children}
      </button>
    </>
  );
};
