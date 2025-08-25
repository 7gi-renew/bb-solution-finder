import { render, screen, waitFor } from "@testing-library/react";
import { Result } from "../Result";
import { BrowserRouter } from "react-router-dom";
import { fetchProblemData } from "../utils/supabase-function";
import { GoogleGenAI } from "@google/genai";
import userEvent from "@testing-library/user-event";

function rendering() {
  render(
    <BrowserRouter>
      <Result />
    </BrowserRouter>
  );
}

jest.mock("../utils/supabase-function", () => {
  return {
    fetchProblemData: jest.fn(),
  };
});

const fetchedData = {
  id: "1",
  created_at: "2025-07-26 10:10:15.98636+00",
  first_category: "打撃",
  first_text: "テストテキスト1",
  second_category: "カテゴリ2",
  third_category: "カテゴリ3",
  last_category: "カテゴリ4",
  last_text: "テストテキスト2",
};

jest.mock("@google/genai", () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: {
      generateContent: jest.fn().mockResolvedValue({
        candidates: [
          {
            content: {
              parts: [{ text: "【練習法：モック練習法】" }],
            },
          },
        ],
      }),
    },
  })),
}));

jest.mock("react-markdown", () => {
  return ({ children }: any) => <div>{children}</div>;
});

beforeEach(() => {
  (fetchProblemData as jest.Mock).mockResolvedValue([fetchedData]);

  (GoogleGenAI as jest.Mock).mockImplementation(() => ({
    models: {
      generateContent: jest.fn().mockResolvedValue({
        candidates: [{ content: { parts: [{ text: "【練習法：モック練習法】" }] } }],
      }),
    },
  }));

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({
      items: [{ id: { videoId: "BLkCR5h_Sv4" } }],
    }),
  }) as jest.Mock;
});

const mockNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigator,
}));

describe("Result画面のテスト", () => {
  test("Now Loading...の文字が最初に表示される1", async () => {
    rendering();

    await waitFor(() => {
      expect(screen.getByText("Now Loading...")).toBeInTheDocument();
    });
    screen.debug();
  });

  test("モック練習法という結果が見れる", async () => {
    rendering();
    await waitFor(async () => {
      await expect(screen.getByText("モック練習法")).toBeInTheDocument();
    });
  });

  test("トップへ戻るボタンを押下するとトップ画面に戻る", async () => {
    rendering();

    await waitFor(async () => {
      const returnBtn = screen.getByRole("button", { name: "ホームへ戻る" });
      await userEvent.click(returnBtn);
      await expect(mockNavigator).toHaveBeenCalledWith("/");
    });
  });
});
