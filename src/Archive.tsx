import { useEffect, useRef, useState, type MouseEvent } from "react";
import { fetchSolutionData } from "./utils/supabase-function";
import type { solutionTypeBase } from "./domain/record";
import moment from "moment";
import { MoveButton } from "./components/MoveButton";
import { useNavigate } from "react-router-dom";
import Markdown from "react-markdown";

export function Archive() {
  const [solutionData, setSolutionData] = useState<solutionTypeBase[]>([]);
  const navigate = useNavigate();

  //  解決策のデータを取得
  useEffect(() => {
    const getSolution = async () => {
      const data = await fetchSolutionData();

      setSolutionData(data);
    };
    getSolution();
  }, []);

  /****************************************
    details要素を押下した時のアコーディオンの挙動
   *****************************************/
  const refs = useRef<Record<number, HTMLDivElement | null>>({});

  const accordion = (e: MouseEvent<HTMLInputElement>, id: number) => {
    e.preventDefault();
    const content = refs.current[id];
    const details = content?.parentElement as HTMLDetailsElement;

    const closingAnimation = (content: HTMLElement) => [
      {
        height: `${content.offsetHeight}px`,
        opacity: 1,
      },
      {
        height: 0,
        opacity: 0,
      },
    ];

    const openingAnimation = (content: HTMLElement) => [
      {
        height: 0,
        opacity: 0,
      },
      {
        height: `${content.offsetHeight}px`,
        opacity: 1,
      },
    ];

    const animation = {
      duration: 300,
      easing: "ease-out",
    };

    if (!details.open) {
      content?.animate(openingAnimation(content), animation);
      details.setAttribute("open", "true");
      return;
    }
    if (content) {
      content.animate(closingAnimation(content), animation).onfinish = () => {
        details.removeAttribute("open");
      };
      return;
    }
  };

  // ホームへ戻るボタンを押した時の挙動
  const transitionToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div></div>
      <div>
        {solutionData.map((elem) => {
          return (
            <div key={elem.id} className="w-100 mx-auto px-4 py-4 shadow-lg not-first-of-type:mt-8">
              <details className="cursor-pointer ">
                <summary className="list-none" onClick={(e: MouseEvent<HTMLInputElement>) => accordion(e, elem.id)}>
                  <p>{moment(elem.created_at).format("YYYY-MM-DD")}</p>
                  <p>{elem.practice_text}</p>
                </summary>
                <div
                  className="overflow-hidden"
                  ref={(val) => {
                    refs.current[elem.id] = val;
                  }}
                >
                  <div className="px-2 py-4">
                    <Markdown>{elem.solution_text}</Markdown>
                    <div>
                      <iframe
                        id="player"
                        width="100%"
                        src={"https://www.youtube.com/embed/" + elem.video_id} //先ほど保存したvideoId
                        allowFullScreen
                        className="aspect-16/9"
                      />
                    </div>
                  </div>
                </div>
              </details>
            </div>
          );
        })}
      </div>
      <MoveButton onClick={transitionToHome}>ホームへ戻る</MoveButton>
    </>
  );
}
