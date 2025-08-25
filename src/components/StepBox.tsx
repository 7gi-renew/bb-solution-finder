import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  step: string;
  labelText: string;
};

export const StepBox: React.FC<Props> = ({ children, step, labelText }) => {
  return (
    <>
      <div className={`bg-white px-[20px] py-[24px]  shadow-[0_0px_5px_rgba(0,0,0,0.1)]`}>
        <h3 className="uppercase font-bold text-[18px] text-blue-600 mb-[4px]">{step}</h3>
        <p className="text-[14px] uppercase">{labelText}</p>
        {children}
      </div>
    </>
  );
};
