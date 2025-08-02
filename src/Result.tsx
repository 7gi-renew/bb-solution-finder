import { useEffect, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { useNavigate } from "react-router-dom";
import { fetchProblemData, insertSolutionData } from "./utils/supabase-function";
import Markdown from "react-markdown";
import { Spinner } from "./components/Spinner";
import { MoveButton } from "./components/MoveButton";

export function Result() {
  const [firstLoading, setFirstLoading] = useState<boolean>(false);
  const [movieLoading, setMovieLoading] = useState<boolean>(false);
  const [solutionText, setSolutionText] = useState<string>("");
  const [searchWord, setSearchWord] = useState<string>("");
  const [practiceText, setPracticeText] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");
  const [isStoreButtonDisabled, setIsStoreButtonDisabled] = useState<boolean>(true);

  const YOUTUBE_API_URI = "https://www.googleapis.com/youtube/v3/search?";
  const YOUTUBE_API_KEY = process.env.VITE_YOUTUBE_API_KEY;

  // 遷移関連の処理
  const navigate = useNavigate();

  // supabaseからデータを取得
  useEffect(() => {
    const fetchProblem = async () => {
      const data = await fetchProblemData();
      const dataLength = data.length;
      const latestData = data[dataLength - 1];
      const ai = await new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

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
      【ポイント1：(上記の練習法で意識すること1つ目)】
      【ポイント2：(上記の練習法で意識すること2つ目)】
      【ポイント3：(上記の練習法で意識すること3つ目)】
      のフォーマットに従って記載してください。
    `;
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
        });

        const name = await response.text!.match(/【練習法：(.+?)】/)![1];

        await setSolutionText(response.text!);
        await setPracticeText(name);
        await setSearchWord(`【野球/${latestData.first_category}】${name}`);

        await setFirstLoading(true);
      }
      main();
    };

    fetchProblem();
  }, []);

  useEffect(() => {
    const getID = async () => {
      console.log(searchWord);
      if (searchWord != "") {
        // クエリ文字列を定義する
        const params = await {
          key: YOUTUBE_API_KEY!,
          q: `${searchWord}`,
          type: "video",
          order: "viewCount",
        };

        const queryParams = await new URLSearchParams(params);
        await fetch(YOUTUBE_API_URI + queryParams)
          .then((res) => res.json())
          .then(
            (result) => {
              console.log("API success:", result);

              if (result.items && result.items.length !== 0) {
                const firstItem = result.items[0];
                setVideoId(firstItem.id.videoId);
                setMovieLoading(true);

                if (firstItem.id.videoId != "") {
                  setIsStoreButtonDisabled(false);
                }
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
    console.log(practiceText);
    await insertSolutionData(solutionText, practiceText, videoId);
  };

  // ホームへ戻るボタンを押したときの挙動
  const transitionToHome = () => {
    // navigate("/");
  };

  return (
    <>
      <div>
        {firstLoading || (
          <>
            <Spinner />
            <div className="flex justify-center" aria-label="読み込み中">
              <p>Now Loading...</p>
            </div>
          </>
        )}
        {firstLoading && (
          <>
            <div className="w-100 mx-auto">
              <h2>結果表示</h2>
              <div className="mt-4 ">
                解決策
                <div className="border-gray-200 px-4 py-6 border-1">
                  <Markdown>{solutionText}</Markdown>
                </div>
              </div>
              {movieLoading || (
                <>
                  <Spinner />
                </>
              )}
              {movieLoading && (
                <div>
                  <iframe
                    id="player"
                    width="640"
                    height="360"
                    src={"https://www.youtube.com/embed/" + videoId} //先ほど保存したvideoId
                    allowFullScreen
                  />
                </div>
              )}
              <MoveButton onClick={storeData} disabled={isStoreButtonDisabled}>
                結果を保存する
              </MoveButton>
              <MoveButton onClick={transitionToHome}>トップへ戻る</MoveButton>
            </div>
          </>
        )}
      </div>
    </>
  );
}
