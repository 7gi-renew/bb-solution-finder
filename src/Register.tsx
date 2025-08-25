import { useState, type ChangeEvent } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { firstCategoryArray, lastCategory, secondCategoryArray, thirdCategory } from "./Register-condition";
import { RadioButton } from "./components/RadioButton";
import { insertProblemData } from "./utils/supabase-function";
import { CheckList } from "./components/CheckList";
import { StepBox } from "./components/StepBox";
import { PrimaryButton } from "./components/PrimaryButton";
import { SecondaryButton } from "./components/SecondaryButton";

interface IFormInput {
  firstCategories: string;
  firstText: string;
  lastCategories: string;
  lastText: string;
}

type CategoryArray = {
  name: string;
  value: string;
};

export function Register() {
  const navigate = useNavigate();

  // STEP1の設定変数
  const [isFirstShow, setIsFirstShow] = useState<boolean>(true);
  const [firstText, setFirstText] = useState("");
  const [firstCategory, setFirstCategory] = useState("");
  const [isFirstFilled, setIsFirstFilled] = useState<boolean>(false);

  // STEP2の設定変数
  const [isSecondShow, setIsSecondShow] = useState(false);
  const [secondArray, setSecondArray] = useState<CategoryArray[]>([]);
  const [secondTitle, setSecondTitle] = useState("");
  const [isSecondFilled, setIsSecondFilled] = useState<boolean>(false);

  // STEP3の設定変数
  const [isThirdShow, setIsThirdShow] = useState(false);
  const [thirdArray, setThirdArray] = useState<CategoryArray[]>([]);
  const [thirdTitle, setThirdTitle] = useState("");
  const [lastArray, setLastArray] = useState<CategoryArray[]>([]);
  const [isThirdFilled, setIsThirdFilled] = useState<boolean>(false);

  // STEP4の設定変数
  const [isLastShow, setIsLastShow] = useState(false);

  const errorClass = "text-red-500 mt-[6px] text-[14px] font-bold";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  /*********************************************
    最初のフォームのsubmitボタンを押した時の挙動
  **********************************************/
  const onSubmitFirst: SubmitHandler<IFormInput> = (data) => {
    // 記入テキストを変数に登録
    const firstResultCategory = data.firstCategories;
    const firstResultText = data.firstText;
    setFirstText(firstResultText);
    setFirstCategory(firstResultCategory);
    // 最初の入力値を元に2つ目の選択肢を取得する
    const secondItems = secondCategoryArray(firstResultCategory);
    setSecondArray(secondItems);
    // 2つ目のフォームを表示させる
    setIsFirstShow(false);
    setIsSecondShow(true);
    // 1つ目のチェックリストにチェックをつける
    setIsFirstFilled(true);
  };

  /*********************************************
    2つ目のフォームを入力した時の挙動
  **********************************************/
  const onChangeSecond = (event: ChangeEvent<HTMLInputElement>) => {
    const eValue = event.target.value;
    setSecondTitle(eValue);
    // 入力値を元に3つ目のフォームの選択肢を決定する
    const thirdItems = thirdCategory(firstCategory, event.target.value)!;
    setThirdArray(thirdItems);
    // 3つ目のフォームを表示させる
    setIsSecondShow(false);
    setIsThirdShow(true);
    // 2つ目のチェックリストにチェックをつける
    setIsSecondFilled(true);
  };

  /*********************************************
    3つ目のフォームを入力した時の挙動
  **********************************************/
  const onChangeThird = (event: ChangeEvent<HTMLInputElement>) => {
    const eValue = event.target.value;
    setThirdTitle(eValue);
    // 入力値を元に4つ目のフォームの選択肢を決定する
    const lastItems = lastCategory(firstCategory, secondTitle, event.target.value)!;
    setLastArray(lastItems);
    // 4つ目のフォームを表示させる
    setIsThirdShow(false);
    setIsLastShow(true);
    // 3つ目のチェックリストにチェックをつける
    setIsThirdFilled(true);
  };
  /*********************************************
    クリアボタンを押した時の挙動
  **********************************************/
  const clearData = () => {
    // STEPの進捗状況を元に戻す
    setIsFirstFilled(false);
    setIsSecondFilled(false);
    setIsThirdFilled(false);
    // 入力された情報を元に戻す
    setIsLastShow(false);
    setIsFirstShow(true);
  };

  /*********************************************
     「練習法へ進む」ボタンを押した時の挙動
  **********************************************/
  const onSubmitLast: SubmitHandler<IFormInput> = async (data) => {
    await insertProblemData(firstCategory, firstText, secondTitle, thirdTitle, data.lastCategories, data.lastText);
    await navigate("/result/");
  };

  /*********************************************
    STEPのチェックボタンを押下した時の挙動
  **********************************************/
  const showPrevForm = (e: any) => {
    const stepId = e.target.id;
    // 一度全てのフォームを消す
    setIsFirstShow(false);
    setIsSecondShow(false);
    setIsThirdShow(false);
    setIsLastShow(false);
    // 押下した部分に合わせたフォームを再表示する
    switch (stepId) {
      case "step1":
        setIsFirstShow(true);
        break;
      case "step2":
        setIsSecondShow(true);
        break;
      case "step3":
        setIsThirdShow(true);
        break;
      case "step4":
        setIsLastShow(true);
        break;
    }
  };

  return (
    <>
      <div className="w-full py-[40px] h-dvh bg-gray-50">
        <div className="px-6 md:max-w-[600px] md:mx-auto">
          <div>
            <h2 className="text-xl font-bold text-center">課題を登録しましょう</h2>
            <div className={`grid pt-[20px] gap-[8px]`}>
              <CheckList id="step1" onClick={showPrevForm} active={isFirstFilled}>
                お悩みを登録する
              </CheckList>
              <CheckList id="step2" onClick={showPrevForm} active={isSecondFilled}>
                お悩みの原因を登録する
              </CheckList>
              <CheckList id="step3" onClick={showPrevForm} active={isThirdFilled}>
                お悩みのカテゴリを登録する
              </CheckList>
              <CheckList id="step4" onClick={showPrevForm} active={false}>
                具体的な課題を登録する
              </CheckList>
            </div>
            <div className="mt-[24px]">
              {/* フォーム1つ目 */}
              {isFirstShow && (
                <StepBox step="step1" labelText="お悩みの項目を教えてください">
                  <form onSubmit={handleSubmit(onSubmitFirst)}>
                    <Controller
                      name="firstCategories"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <div className="flex gap-[10px] mt-[12px] flex-wrap">
                          {firstCategoryArray.map((cat) => (
                            <RadioButton key={cat.value} parentKey={cat.value} id={cat.value} checked={field.value === cat.name} value={cat.name} onChange={field.onChange} htmlFor={cat.value} addClass="step1Radio">
                              {cat.name}
                            </RadioButton>
                          ))}
                        </div>
                      )}
                    />
                    {errors.firstCategories && <p className={`${errorClass}`}>選択肢が未登録です</p>}
                    <div className="mt-[24px]">
                      <p className="text-[14px]">お悩みの詳細を教えてください</p>
                      <textarea rows={6} className="border rounded-sm w-full mt-[12px] step1Form" {...register("firstText", { required: true })} />
                      {errors.firstText && <p className={`${errorClass}`}>入力テキストがありません</p>}
                    </div>
                    <PrimaryButton fullSize isSubmit value="診断をはじめる" addClass="mt-[24px]" />
                  </form>
                </StepBox>
              )}
              {/* フォーム2つ目 */}
              {isSecondShow && (
                <>
                  <StepBox step="step2" labelText="お悩みの原因を教えてください">
                    <form>
                      <div className="flex gap-[10px] mt-[12px] flex-wrap">
                        {secondArray.map((cat) => (
                          <>
                            <RadioButton key={cat.value} parentKey={cat.value} name="secondCategories" id={cat.value} checked={secondTitle === cat.name} value={cat.name} onChange={(e) => onChangeSecond(e)} htmlFor={cat.value} addClass="step2Radio">
                              {cat.name}
                            </RadioButton>
                          </>
                        ))}
                      </div>
                    </form>
                  </StepBox>
                </>
              )}
              {/* フォーム3つ目 */}
              <div className="mt-6">
                {isThirdShow && (
                  <>
                    <StepBox step="step3" labelText="お悩みのカテゴリを教えてください">
                      <form>
                        <div className="flex gap-[10px] mt-[12px] flex-wrap">
                          {thirdArray.map((cat) => (
                            <RadioButton key={cat.value} parentKey={cat.value} name="thirdCategories" id={cat.value} checked={thirdTitle === cat.name} value={cat.name} onChange={onChangeThird} htmlFor={cat.value} addClass="step3Radio">
                              {cat.name}
                            </RadioButton>
                          ))}
                        </div>
                      </form>
                    </StepBox>
                  </>
                )}
              </div>
              {/* フォーム4つ目 */}
              {isLastShow && (
                <StepBox step="step4" labelText="具体的な課題の分類を教えてください">
                  <form onSubmit={handleSubmit(onSubmitLast)}>
                    <Controller
                      name="lastCategories"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <div className="flex gap-[10px] mt-[12px] flex-wrap">
                          {lastArray.map((cat) => (
                            <RadioButton key={cat.value} parentKey={cat.value} id={cat.value} checked={field.value === cat.name} value={cat.name} onChange={field.onChange} htmlFor={cat.value} addClass="step4Radio">
                              {cat.name}
                            </RadioButton>
                          ))}
                        </div>
                      )}
                    />
                    {errors.lastCategories && <p className={`${errorClass}`}>選択肢が未登録です</p>}
                    <div className="mt-[24px]">
                      <p className="text-[14px]">具体的な課題の詳細を教えてください</p>
                      <textarea rows={6} className="border rounded-sm w-full mt-[12px] step4Form" {...register("lastText", { required: true })} />
                      {errors.lastText && <p className={`${errorClass}`}>入力テキストがありません</p>}
                    </div>
                    <div className="flex gap-[20px] mt-[24px]">
                      <SecondaryButton fullSize={true} onClick={clearData}>
                        最初に戻る
                      </SecondaryButton>
                      <PrimaryButton fullSize={true} isSubmit value="練習法へ進む" />
                    </div>
                  </form>
                </StepBox>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
