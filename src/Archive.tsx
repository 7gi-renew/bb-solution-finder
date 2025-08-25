import { Fragment, useEffect, useState } from "react";
import { fetchSolutionData } from "./utils/supabase-function";
import type { solutionTypeBase } from "./domain/record";
import { useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import { SecondaryButton } from "./components/SecondaryButton";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaXmark } from "react-icons/fa6";
import { cdate } from "cdate";

export function Archive() {
  const [solutionData, setSolutionData] = useState<solutionTypeBase[]>([]);
  const [showData, setShowData] = useState(false);
  const [selectedElem, setSelectedElem] = useState<solutionTypeBase>();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  //  解決策のデータを取得
  useEffect(() => {
    const getSolution = async () => {
      const data = await fetchSolutionData();
      setSolutionData(data);
      setShowData(true);
    };
    getSolution();
  }, []);

  // カードを押下した時の挙動
  const clickCard = (e: solutionTypeBase) => {
    setSelectedElem(e);
    setIsOpen(true);
  };

  // モーダルを閉じた時の挙動

  function close() {
    setIsOpen(false);
  }

  // ホームへ戻るボタンを押した時の挙動
  const transitionToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="w-full h-dvh h-100vh bg-gray-50 ">
        <div className="px-6 pt-[40px] h-full mx-auto md:max-w-[600px]">
          <h2 className="text-[20px] font-bold text-center">過去の解決策を見る</h2>
          <div className="mt-[40px]">
            {showData && solutionData.length === 0 && (
              <>
                <div className="flex align-center h-full w-full items-center justify-center">
                  <p>登録データがありません</p>
                </div>
              </>
            )}
            {showData &&
              solutionData.map((elem) => {
                return (
                  <Fragment key={elem.id}>
                    <div id={`card${elem.id}`} onClick={() => clickCard(elem)} className="cursor-pointer w-full mx-auto px-[20px] py-[16px] bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)] not-first-of-type:mt-8">
                      <div>
                        <div className="flex pointer-events-none items-center gap-[6px]">
                          <p className="time pointer-events-none text-[13px]">{cdate(elem.created_at).format("YYYY-MM-DD")}</p>
                          <p className="text-[12px] pointer-events-none text-white bg-blue-600 font-bold rounded-full px-[10px] py-[2px]">{elem.practice_category}</p>
                        </div>
                        <p className="mt-[8px] pointer-events-none font-bold">{elem.practice_text}</p>
                      </div>
                      <div>
                        {elem.video_id && (
                          <div className="px-2 py-4">
                            <iframe
                              id="player"
                              width="100%"
                              src={"https://www.youtube.com/embed/" + elem.video_id} //先ほど保存したvideoId
                              allowFullScreen
                              className="aspect-16/9"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            {selectedElem && (
              <Dialog key={selectedElem.id} open={isOpen} as="div" className="relative z-10 focus:outline-none dialog" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex overflow-y-scroll min-h-full items-center justify-center px-6 py-8 bg-black/40">
                    <DialogPanel transition className="w-full  overflow-y-scroll  max-w-md relative rounded-md bg-white  p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                      <DialogTitle as="h3" className="text-base/7 font-medium">
                        <div className="flex items-center gap-[6px]">
                          <p className="time pointer-events-none text-[13px]">{cdate(selectedElem.created_at).format("YYYY-MM-DD")}</p>
                          <p className="text-[12px] pointer-events-none leading-[1.5] text-white bg-blue-600  font-bold rounded-full px-[10px] py-[2px]">{selectedElem.practice_category}</p>
                        </div>
                      </DialogTitle>
                      <p className="mt-2 text-md font-bold">{selectedElem.practice_text}</p>
                      {selectedElem.video_id != "" || (
                        <div className="mt-[20px]">
                          <iframe
                            id="player"
                            width="auto"
                            height="auto"
                            src={"https://www.youtube.com/embed/" + selectedElem.video_id} //先ほど保存したvideoId
                            allowFullScreen
                            className="aspect-[16/9]"
                          />
                        </div>
                      )}
                      {selectedElem.video_id === "" || (
                        <div className="mt-[20px] text-center text-red-500">
                          <p>動画が登録されていません。</p>
                        </div>
                      )}
                      <div className="mt-[24px] text-[13px]">
                        <Markdown>{selectedElem.solution_text}</Markdown>
                      </div>
                      <div className="mt-4">
                        <Button className="inline-flex absolute top-[16px] right-[16px]" onClick={close}>
                          <FaXmark className="text-black text-[18opx]" />
                        </Button>
                      </div>
                    </DialogPanel>
                  </div>
                </div>
              </Dialog>
            )}
          </div>
          <div className="mt-[40px]">
            <SecondaryButton onClick={transitionToHome} fullSize>
              ホームへ戻る
            </SecondaryButton>
          </div>
        </div>
      </div>
    </>
  );
}
