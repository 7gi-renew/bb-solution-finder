import React from "react";

type Props = {
  value: string;
};

export const SubmitButton: React.FC<Props> = ({ value }) => {
  return <input type="submit" className="px-6 py-2 bg-blue-500 text-white font-bold rounded-sm" value={value} />;
};
