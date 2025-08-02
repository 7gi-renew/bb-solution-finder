import React, { type MouseEventHandler, type ReactNode } from "react";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  disabled?: boolean;
  isSubmit: boolean;
  value?: string;
  addClass?: string;
  fullSize: boolean;
};

export const PrimaryButton: React.FC<Props> = ({ onClick, children, disabled, fullSize, isSubmit, value, addClass }) => {
  return (
    <>
      {isSubmit && <input type="submit" value={value} className={`py-[12px] bg-blue-600 text-white font-bold rounded-[6px]  ${fullSize && `w-full`} hover:bg-blue-500 disabled:bg-gray-100 disabled:text-gray-900 ${addClass}`} disabled={disabled} />}
      {isSubmit || (
        <button className={`py-[12px] bg-blue-600 text-white font-bold rounded-[6px]  ${fullSize && `w-full`} hover:bg-blue-500 disabled:bg-gray-100 disabled:text-gray-900 ${addClass}`} disabled={disabled} onClick={onClick!}>
          {children}
        </button>
      )}
    </>
  );
};
