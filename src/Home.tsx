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
      <div className="w-full h-dvh h-100vh bg-gray-50 grid place-content-center ">
        <div className="px-6 md:max-w-[600px]">
          <h1 className="text-3xl text-center font-bold">野球課題&解決策アプリ</h1>
          <p className="inline-block mt-[24px]">ユーザーが抱えている課題や問題点を洗い出して細分化し、その課題を解消するための解決方法と解説動画をAIが分析します。</p>
          <p className="inline-block mt-[10px]">課題に対する適切なアプローチを提供し、あなたの能力向上に役立てます。</p>
          <div className="grid  mt-[40px] gap-[16px]">
            <PrimaryButton onClick={transitionPage} fullSize isSubmit={false}>
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
