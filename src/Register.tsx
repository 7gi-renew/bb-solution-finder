import { useState, type ChangeEvent } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { firstCategoryArray, lastCategory, secondCategoryArray, thirdCategory } from "./Register-condition";
import { RadioButton } from "./components/RadioButton";
import { insertProblemData } from "./utils/supabase-function";
import { SubmitButton } from "./components/SubmitButton";
import { CheckList } from "./components/CheckList";
import { StepBox } from "./components/StepBox";
import { PrimaryButton } from "./components/PrimaryButton";

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

  const [firstText, setFirstText] = useState("");
  const [firstCategory, setFirstCategory] = useState("");
  const [isSecondShow, setIsSecondShow] = useState(false);

  const [secondArray, setSecondArray] = useState<CategoryArray[]>([]);
  const [secondTitle, setSecondTitle] = useState("");

  const [thirdArray, setThirdArray] = useState<CategoryArray[]>([]);
  const [thirdTitle, setThirdTitle] = useState("");
  const [lastArray, setLastArray] = useState<CategoryArray[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmitFirst: SubmitHandler<IFormInput> = (data) => {
    const firstResultCategory = data.firstCategories;
    const firstResultText = data.firstText;

    setFirstText(firstResultText);
    setFirstCategory(firstResultCategory);

    const secondItems = secondCategoryArray(firstResultCategory);

    setSecondArray(secondItems);
    setIsSecondShow(true);
  };

  const onChangeSecond = (event: ChangeEvent<HTMLInputElement>) => {
    const eValue = event.target.value;
    setSecondTitle(eValue);
    const thirdItems = thirdCategory(firstCategory, event.target.value)!;
    setThirdArray(thirdItems);
  };

  const onChangeThird = (event: ChangeEvent<HTMLInputElement>) => {
    const eValue = event.target.value;

    console.log(secondTitle);

    setThirdTitle(eValue);

    const lastItems = lastCategory(firstCategory, secondTitle, event.target.value)!;

    setLastArray(lastItems);
  };

  const onSubmitLast: SubmitHandler<IFormInput> = async (data) => {
    await insertProblemData(firstCategory, firstText, secondTitle, thirdTitle, data.lastCategories, data.lastText);

    await navigate("/result/");
  };

  return (
    <>
      <div className="w-full py-[40px] h-dvh bg-gray-50">
        <div className="px-6">
          <div>
            <h2 className="text-xl font-bold text-center">課題を登録しましょう</h2>
            <ul className={`grid pt-[30px] gap-[12px]`}>
              <CheckList active={true}>お悩みを登録する</CheckList>
              <CheckList active={false}>お悩みの原因を登録する</CheckList>
              <CheckList active={false}>お悩みのカテゴリを登録する</CheckList>
              <CheckList active={false}>具体的な課題を登録する</CheckList>
            </ul>
            <div className="mt-[40px]">
              <StepBox step="step1" mtSpace={false} labelText="お悩みの項目を教えてください">
                <form onSubmit={handleSubmit(onSubmitFirst)}>
                  <Controller
                    name="firstCategories"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="flex gap-[10px] mt-[12px] flex-wrap">
                        {firstCategoryArray.map((cat) => (
                          <RadioButton parentKey={cat.value} id={cat.value} checked={field.value === cat.name} value={cat.name} onChange={field.onChange} htmlFor={cat.value}>
                            {cat.name}
                          </RadioButton>
                        ))}
                      </div>
                    )}
                  />
                  {errors.firstCategories && <p>選択肢がありません</p>}
                  <div className="mt-[30px]">
                    <p className="text-[14px]">お悩みの詳細を教えてください</p>
                    <textarea rows={6} className="border rounded-sm w-full mt-[12px]" {...register("firstText", { required: true })} />
                    {errors.firstText && <p>入力テキストがありません</p>}
                  </div>
                  <PrimaryButton fullSize isSubmit value="スタート" addClass="mt-[24px]" />
                </form>
              </StepBox>
              <div className="mt-6">
                {isSecondShow && (
                  <>
                    <form>
                      <div className="flex gap-2 flex-wrap">
                        {secondArray.map((cat) => (
                          <>
                            <RadioButton parentKey={cat.value} name="secondCategories" id={cat.value} checked={secondTitle === cat.name} value={cat.name} onChange={(e) => onChangeSecond(e)} htmlFor={cat.value}>
                              {cat.name}
                            </RadioButton>
                          </>
                        ))}
                      </div>
                    </form>
                  </>
                )}
              </div>
              <div className="mt-6">
                {secondTitle != "" && (
                  <>
                    <form>
                      <div className="flex gap-2 flex-wrap">
                        {thirdArray.map((cat) => (
                          <RadioButton parentKey={cat.value} name="thirdCategories" id={cat.value} checked={thirdTitle === cat.name} value={cat.name} onChange={onChangeThird} htmlFor={cat.value}>
                            {cat.name}
                          </RadioButton>
                        ))}
                      </div>
                    </form>
                  </>
                )}
              </div>

              <div className="mt-6">
                {thirdTitle != "" && (
                  <form onSubmit={handleSubmit(onSubmitLast)}>
                    <Controller
                      name="lastCategories"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <div className="flex gap-2 flex-wrap">
                          {lastArray.map((cat) => (
                            <RadioButton parentKey={cat.value} id={cat.value} checked={field.value === cat.name} value={cat.name} onChange={field.onChange} htmlFor={cat.value}>
                              {cat.name}
                            </RadioButton>
                          ))}
                        </div>
                      )}
                    />
                    {errors.lastCategories && <p>選択肢がありません</p>}
                    <div>
                      <textarea rows={6} className="border rounded-sm w-100" {...register("lastText", { required: true })} />
                      {errors.lastText && <p>入力テキストがありません</p>}
                    </div>
                    <SubmitButton value="結果へ" />
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
