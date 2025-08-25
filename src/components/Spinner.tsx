export const Spinner = () => {
  return (
    <div className="flex justify-center" id="spinner" aria-label="読み込み中">
      <div className="animate-spin h-[30px] w-[30px] border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  );
};
