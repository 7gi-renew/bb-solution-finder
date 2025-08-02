import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./components/PrimaryButton";
import { SecondaryButton } from "./components/SecondaryButton";

export function Home() {
  const navigate = useNavigate();

  const transitionPage = () => {
    navigate("/register/");
  };

  const storagePage = () => {
    navigate("/archive/");
  };

  return (
    <>
      <div className="w-full h-dvh h-100vh bg-gray-50 grid place-content-center">
        <div className="px-6">
          <h2 className="text-3xl text-center font-bold">野球課題発見アプリ</h2>
          <p className="inline-block mt-[24px]">ここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入ります</p>
          <div className="grid  mt-[40px] gap-[16px]">
            <PrimaryButton onClick={transitionPage} fullSize>
              はじめる
            </PrimaryButton>
            <SecondaryButton onClick={storagePage} fullSize>
              履歴へ
            </SecondaryButton>
          </div>
        </div>
      </div>
    </>
  );
}
