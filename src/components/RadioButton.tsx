type Props = {
  parentKey?: string;
  name?: string;
  id?: string;
  checked: boolean;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  children?: string;
  htmlFor?: string;
  addClass?: string;
};

export const RadioButton: React.FC<Props> = ({ parentKey, name, id, checked, value, onChange, children, htmlFor, addClass }) => {
  return (
    <>
      <div key={parentKey}>
        <input name={name} type="radio" id={id} checked={checked} value={value} onChange={onChange} className={`sr-only peer ${addClass}`} />
        <label htmlFor={htmlFor} className="inline-block rounded-full  text-[14px] font-medium px-[15px] py-[4px] bg-gray-200 peer-checked:bg-blue-500 peer-checked:text-white">
          {children}
        </label>
      </div>
    </>
  );
};
