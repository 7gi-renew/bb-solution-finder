import { type MouseEventHandler, type ReactNode } from "react";
import { FaCheck } from "react-icons/fa6";

type Props = {
  active: boolean;
  id: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const CheckList: React.FC<Props> = ({ active, children, id, onClick }) => {
  return (
    <>
      <button type="button" id={id} className="flex gap-[8px] items-center" onClick={onClick}>
        <div className={`aspect-square w-[20px] grid place-content-center rounded-full ${active ? "bg-blue-600" : "bg-neutral-200"}`}>
          <FaCheck className={`w-[8px] ${active ? "text-white" : "text-black"}`} />
        </div>
        <p className={`text-[14px] pointer-events-none ${active ? "text-blue-600" : "text-black"}`}>{children}</p>
      </button>
    </>
  );
};
