import { useEffect, useState } from "react";
import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";
import { useNavigate } from "react-router-dom";
import { fetchProblemData, insertSolutionData } from "./utils/supabase-function";
import Markdown from "react-markdown";
import { Spinner } from "./components/Spinner";
import { SecondaryButton } from "./components/SecondaryButton";
import { PrimaryButton } from "./components/PrimaryButton";

export function Result() {
  const [firstLoading, setFirstLoading] = useState<boolean>(false);
  const [movieLoading, setMovieLoading] = useState<boolean>(false);
  const [movieShow, setMovieShow] = useState<boolean>(true);
  const [solutionText, setSolutionText] = useState<string>("");
  const [searchWord, setSearchWord] = useState<string>("");
  const [practiceText, setPracticeText] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");
  const [isStoreButtonDisabled, setIsStoreButtonDisabled] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("");
  const [isStored, setIsStored] = useState<boolean>(false);

  const YOUTUBE_API_URI = "https://www.googleapis.com/youtube/v3/search?";
  const YOUTUBE_API_KEY = process.env.VITE_YOUTUBE_API_KEY;

  // 遷移関連の処理
  const navigate = useNavigate();

  /*********************************************
    データの取得+プロンプトの作成
  **********************************************/
  useEffect(() => {
    const fetchProblem = async () => {
      //  supabaseからデータを取得、
      const data = await fetchProblemData();
      const dataLength = data.length;
      const latestData = data[dataLength - 1];
      const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

      // Geminiのプロンプトを作成
      async function main() {
        const prompt = await `
      私は野球をプレイしています。現在、野球で以下のような課題を抱えています。
      課題1(大分類)：${latestData.first_category}
      課題の概要：${latestData.first_text}
      課題2(課題1の子分類)：【${latestData.first_category}】${latestData.second_category}
      課題3(課題2の子分類)：【${latestData.first_category}】${latestData.third_category}
      課題4(課題3の子分類、細分化した最終的な課題)：【${latestData.first_category}】${latestData.last_category}
      課題4の具体的な内容：${latestData.last_text}
      これらの課題の分類、概要、具体的内容を踏まえて、最も効果があると考えられる練習法を1つ教えてください。

      ただし、その練習法については
      【練習法：(最も効果のある練習法)】
      【ポイント1：(上記の練習法で意識すること1つ目を15文字以内で出力)】
      【ポイント2：(上記の練習法で意識すること2つ目)】
      【ポイント3：(上記の練習法で意識すること3つ目)】
      のフォーマットに従って記載してください。

      ただし、(最も効果のある練習法)と文字列をそのまま出力するのではなく、効果のある練習法の内容をテキストで出力してください。
    `;
        const result: GenerateContentResponse = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
        });

        // 文字列から「練習法」に当てはまる部分を抽出
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
        const name = text.match(/【練習法：(.+?)】/)?.[1];
        // 取得したデータから登録用のテキストを変数に格納
        await setSolutionText(result.text!);
        await setPracticeText(name!);
        await setSearchWord(`【野球/${latestData.first_category}】${name}`);
        await setCategory(latestData.first_category);
        await setFirstLoading(true);
      }
      main();
    };

    fetchProblem();
  }, []);

  /*********************************************
    抽出したテキストからYouTubeの動画を検索
  **********************************************/
  useEffect(() => {
    const getID = async () => {
      if (searchWord != "") {
        // クエリ文字列を定義
        const params = await {
          key: YOUTUBE_API_KEY!,
          q: `${searchWord}`,
          type: "video",
          order: "viewCount",
        };

        // クエリ文字列を元に動画を検索
        const queryParams = await new URLSearchParams(params);
        await fetch(YOUTUBE_API_URI + queryParams)
          .then((res) => res.json())
          .then(
            (result) => {
              console.log("API success:", result);
              setMovieLoading(true);
              setIsStoreButtonDisabled(false);

              if (result.items && result.items.length !== 0) {
                const firstItem = result.items[0];
                console.log(firstItem.id.videoId);
                setVideoId(firstItem.id.videoId);
                setMovieShow(true);
              } else {
                setMovieShow(false);
              }
            },
            (error) => {
              console.error(error);
            }
          );
      }
    };
    getID();
  }, [solutionText, videoId]);

  // 保存ボタンを押した時の挙動
  const storeData = async () => {
    await insertSolutionData(solutionText, practiceText, videoId, category);
    setIsStored(true);
    setIsStoreButtonDisabled(true);
  };

  // ホームへ戻るボタンを押したときの挙動
  const transitionToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div>
        {firstLoading || (
          <>
            <div className="w-full h-dvh bg-gray-50 grid place-content-center">
              <div className="text-center">
                <Spinner />
                <div className="mt-[16px]" aria-label="読み込み中">
                  <p>Now Loading...</p>
                </div>
              </div>
            </div>
          </>
        )}
        {firstLoading && (
          <>
            <div className="w-full h-[max(100dvh, 100%)] bg-gray-50 grid place-content-center">
              <div className="px-6 py-8  md:max-w-[600px] md:mx-auto">
                <div className="">
                  <p className="text-center">あなたに最適の練習法は...</p>
                  <p className="font-bold leading-[1.75] text-xl text-center text-blue-600 mt-[8px]">{practiceText}</p>
                  {movieLoading || (
                    <>
                      <div className="mt-[20px]">
                        <Spinner />
                      </div>
                    </>
                  )}
                  {movieLoading && movieShow && (
                    <div className="mt-[20px]">
                      <iframe
                        id="player"
                        width="auto"
                        height="auto"
                        src={"https://www.youtube.com/embed/" + videoId} //先ほど保存したvideoId
                        allowFullScreen
                        className="aspect-[16/9]"
                      />
                    </div>
                  )}
                  {(movieLoading && movieShow) || (
                    <div className="mt-[20px] text-center text-red-500">
                      <p>動画が見つかりませんでした。</p>
                    </div>
                  )}
                  <div className="mt-[30px]">
                    <div className="overflow-hidden text-ellipsis">
                      <div className="text-[14px]">
                        <Markdown>{solutionText}</Markdown>
                      </div>
                    </div>
                  </div>
                  {isStored && <p className="mt-[16px] text-center font-bold">登録しました</p>}
                  <div className="flex gap-[20px] mt-[40px]">
                    <SecondaryButton onClick={storeData} disabled={isStoreButtonDisabled} fullSize>
                      結果を保存する
                    </SecondaryButton>
                    <PrimaryButton onClick={transitionToHome} isSubmit={false} fullSize>
                      ホームへ戻る
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
