import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Register } from "../Register";
import userEvent from "@testing-library/user-event";
import { insertProblemData } from "../utils/supabase-function";

jest.mock("../utils/supabase-function", () => {
  return {
    insertProblemData: jest.fn(),
  };
});

const mockNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigator,
}));

// レンダリングするコンポーネントを関数化
function rendering() {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
}

// STEP1のカテゴリを押下する
async function pushStep1Category() {
  const step1Categories = document.querySelectorAll(".step1Radio");
  await userEvent.click(step1Categories[0]);
}

// STEP1のフォームを入力する
async function getStep1Form(typeText: string) {
  const step1Form = document.querySelector(".step1Form") as HTMLElement;
  await userEvent.type(step1Form, typeText);
}

// STEP1の診断を始めるボタンを押下する
async function pushStep1SubmitBtn() {
  const startBtn = screen.getByRole("button", { name: "診断をはじめる" });
  await userEvent.click(startBtn);
}

// STEP2のカテゴリを押下する
async function pushStep2Category() {
  const step2Categories = await document.querySelectorAll(".step2Radio");
  await userEvent.click(step2Categories[0]);
}

// STEP3のカテゴリを押下する
async function pushStep3Category() {
  const step3Categories = await document.querySelectorAll(".step3Radio");
  await userEvent.click(step3Categories[0]);
}

// STEP4のカテゴリを押下する
async function pushStep4Category() {
  const step4Categories = document.querySelectorAll(".step4Radio");
  await userEvent.click(step4Categories[0]);
}

// STEP4のフォームを入力する
async function getStep4Form(typeText: string) {
  const step4Form = document.querySelector(".step4Form") as HTMLElement;
  await userEvent.type(step4Form, typeText);
}

// STEP4の練習法へ進むボタンを押下する
async function pushStep4SubmitBtn() {
  const moveBtn = screen.getByRole("button", { name: "練習法へ進む" });
  await userEvent.click(moveBtn);
}

// 最初に戻るボタンを押下する
async function pushReverseBtn() {
  const reverseBtn = screen.getByRole("button", { name: "最初に戻る" });
  await userEvent.click(reverseBtn);
}

const insertedMockData = ["打撃", "テストテキスト", "カテゴリ2-1", "カテゴリ3-1", "カテゴリ4-1", "テストテキスト"];

/**********************
  STEP1のテスト項目
************************/
describe("STEP画面1のテスト", () => {
  test("見出しの文字が存在する", () => {
    rendering();
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test("最初にSTEP1の見出しが表示されている", () => {
    rendering();
    expect(screen.getByText("step1")).toBeInTheDocument();
  });

  test("カテゴリとフォームを選択するとSTEP2の項目に移動できる", async () => {
    rendering();
    await pushStep1Category();
    await getStep1Form("テストテキスト");
    await pushStep1SubmitBtn();

    await waitFor(async () => {
      await expect(screen.getByText("step2")).toBeInTheDocument();
    });
  });

  test("カテゴリのみ選択してボタンを押した場合、「入力テストがありません」の文字列が表示される", async () => {
    rendering();
    await pushStep1Category();
    await pushStep1SubmitBtn();

    await waitFor(async () => {
      await expect(screen.getByText("入力テキストがありません")).toBeInTheDocument();
    });
  });

  test("フォームのみ登録した場合、「選択肢が未登録です」の文字列が表示される", async () => {
    rendering();
    await getStep1Form("テストテキスト");
    await pushStep1SubmitBtn();

    await waitFor(async () => {
      await expect(screen.getByText("選択肢が未登録です")).toBeInTheDocument();
    });
  });

  /**********************
    STEP2のテスト項目
  ************************/
  describe("STEP画面2のテスト", () => {
    test("step2用のカテゴリボタンが存在している", async () => {
      rendering();
      await pushStep1Category();
      await getStep1Form("テストテキスト");
      await pushStep1SubmitBtn();

      const step2Categories = document.querySelectorAll(".step2Radio");

      await waitFor(async () => {
        for (let i = 0; i < 3; i++) {
          await expect(step2Categories[i]).toBeInTheDocument();
        }
      });
    });

    test("step2用のカテゴリボタンを押下するとSTEP3に移動する", async () => {
      rendering();
      await pushStep1Category();
      await getStep1Form("テストテキスト");
      await pushStep1SubmitBtn();
      await pushStep2Category();

      await waitFor(async () => {
        await expect(screen.getByText("step3")).toBeInTheDocument();
      });
    });
  });

  /**********************
    STEP3のテスト項目
  ************************/
  describe("STEP画面3のテスト", () => {
    test("step3用のカテゴリボタンが存在している", async () => {
      rendering();
      await pushStep1Category();
      await getStep1Form("テストテキスト");
      await pushStep1SubmitBtn();
      await pushStep2Category();

      const step3Categories = document.querySelectorAll(".step3Radio");

      await waitFor(async () => {
        for (let i = 0; i < 3; i++) {
          await expect(step3Categories[i]).toBeInTheDocument();
        }
      });
    });

    test("step3用のカテゴリボタンを押下するとSTEP4のテキストが表示される", async () => {
      rendering();
      await pushStep1Category();
      await getStep1Form("テストテキスト");
      await pushStep1SubmitBtn();
      await pushStep2Category();
      await pushStep3Category();

      await waitFor(async () => {
        await expect(screen.getByText("step4")).toBeInTheDocument();
      });
    });
  });

  /**********************
    STEP4のテスト項目
  ************************/
  describe("STEP画面4のテスト", () => {
    test("step4用のカテゴリボタンが存在している", async () => {
      rendering();
      await pushStep1Category();
      await getStep1Form("テストテキスト");
      await pushStep1SubmitBtn();
      await pushStep2Category();
      await pushStep3Category();

      const step4Categories = document.querySelectorAll(".step4Radio");

      await waitFor(async () => {
        for (let i = 0; i < 3; i++) {
          await expect(step4Categories[i]).toBeInTheDocument();
        }
      });
    });

    test("カテゴリとフォームを選択するとresult画面に遷移できる", async () => {
      (insertProblemData as jest.Mock).mockResolvedValue(insertedMockData);
      rendering();
      await pushStep1Category();
      await getStep1Form("テストテキスト");
      await pushStep1SubmitBtn();
      await pushStep2Category();
      await pushStep3Category();
      await pushStep4Category();
      await getStep4Form("テストテキスト");
      await pushStep4SubmitBtn();

      await waitFor(async () => {
        expect(mockNavigator).toHaveBeenCalledWith("/result/");
      });
    });

    test("STEP4でカテゴリのみ登録した場合、「入力テキストがありません」と表示される", async () => {
      (insertProblemData as jest.Mock).mockResolvedValue(insertedMockData);

      rendering();
      await pushStep1Category();
      await getStep1Form("テストテキスト");
      await pushStep1SubmitBtn();
      await pushStep2Category();
      await pushStep3Category();
      await pushStep4Category();
      await pushStep4SubmitBtn();

      await waitFor(async () => {
        await expect(screen.getByText("入力テキストがありません")).toBeInTheDocument();
      });
    });

    test("STEP4で「最初に戻る」ボタンを押下するとSTEP1に戻る", async () => {
      rendering();
      await pushStep1Category();
      await getStep1Form("テストテキスト");
      await pushStep1SubmitBtn();
      await pushStep2Category();
      await pushStep3Category();
      await pushReverseBtn();

      await waitFor(async () => {
        await expect(screen.getByText("step1")).toBeInTheDocument();
      });
    });

    test("「お悩みを登録する」のチェックボックスを押下するとstep1に戻る", async () => {
      rendering();
      await pushStep1Category();
      await getStep1Form("テストテキスト");
      await pushStep1SubmitBtn();
      await pushStep2Category();
      await pushStep3Category();
      await pushStep4Category();
      await getStep4Form("テストテキスト");
      await pushStep4SubmitBtn();

      const step1CheckBtn = document.querySelector("#step1")!;
      await userEvent.click(step1CheckBtn);

      await waitFor(async () => {
        await expect(screen.getByText("step1")).toBeInTheDocument();
      });
    });

    test("「お悩みの原因を登録する」のチェックボックスを押下するとstep2に戻る", async () => {
      rendering();
      await pushStep1Category();
      await getStep1Form("テストテキスト");
      await pushStep1SubmitBtn();
      await pushStep2Category();
      await pushStep3Category();
      await pushStep4Category();
      await getStep4Form("テストテキスト");
      await pushStep4SubmitBtn();

      const step1CheckBtn = document.querySelector("#step2")!;
      await userEvent.click(step1CheckBtn);

      await waitFor(async () => {
        await expect(screen.getByText("step2")).toBeInTheDocument();
      });
    });

    test("「お悩みのカテゴリを登録する」のチェックボックスを押下するとstep3に戻る", async () => {
      rendering();
      await pushStep1Category();
      await getStep1Form("テストテキスト");
      await pushStep1SubmitBtn();
      await pushStep2Category();
      await pushStep3Category();
      await pushStep4Category();
      await getStep4Form("テストテキスト");
      await pushStep4SubmitBtn();

      const step1CheckBtn = document.querySelector("#step3")!;
      await userEvent.click(step1CheckBtn);

      await waitFor(async () => {
        await expect(screen.getByText("step3")).toBeInTheDocument();
      });
    });
  });
});
