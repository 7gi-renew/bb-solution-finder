import { type ReactNode } from "react";
import { FaCheck } from "react-icons/fa6";

type Props = {
  active: boolean;
  children?: ReactNode;
};

export const CheckList: React.FC<Props> = ({ active, children }) => {
  return (
    <>
      <li className="flex gap-[12px] items-center">
        <div className={`aspect-square w-[24px] grid place-content-center rounded-full ${active ? "bg-blue-600" : "bg-neutral-200"}`}>
          <FaCheck className={`w-[10px] ${active ? "text-white" : "text-black"}`} />
        </div>
        <p className={`${active ? "text-blue-600" : "text-black"}`}>{children}</p>
      </li>
    </>
  );
};
