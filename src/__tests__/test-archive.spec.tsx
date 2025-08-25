import { BrowserRouter } from "react-router-dom";
import { Archive } from "../Archive";
import { render, screen, waitFor } from "@testing-library/react";
import { fetchSolutionData } from "../utils/supabase-function";
import userEvent from "@testing-library/user-event";
import { solutionTypeBase } from "../domain/record";

jest.mock("../utils/supabase-function", () => {
  return {
    fetchSolutionData: jest.fn(),
  };
});

jest.mock("react-markdown", () => {});

const mockNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigator,
}));

function rendering() {
  render(
    <BrowserRouter>
      <Archive />
    </BrowserRouter>
  );
}

function fetchMockData() {
  const mockedData = new solutionTypeBase(1, "2025-08-06T14:00:50.833709+00:00", "サンプル練習1がおすすめです", "サンプル練習1", "", "打撃");

  (fetchSolutionData as jest.Mock).mockResolvedValue([mockedData]);
}

describe("Result画面のテスト", () => {
  test("見出しが表示されている", async () => {
    fetchMockData();
    rendering();

    await waitFor(() => {
      expect(screen.getByText("過去の解決策を見る")).toBeInTheDocument();
    });
  });

  test("データをレンダリングした後に日付を見れる", async () => {
    fetchMockData();
    rendering();

    await waitFor(() => {
      expect(screen.getByText("2025-08-06")).toBeInTheDocument();
    });
  });

  test("データをレンダリングした後に練習法を見れる", async () => {
    fetchMockData();
    rendering();

    await waitFor(() => {
      expect(screen.getByText("サンプル練習1")).toBeInTheDocument();
    });
  });

  test("戻るボタンを押下するとホーム画面に戻る", async () => {
    fetchMockData();
    rendering();
    const backBtn = screen.getByRole("button", { name: "ホームへ戻る" });
    await userEvent.click(backBtn);

    await waitFor(() => {
      expect(mockNavigator).toHaveBeenCalledWith("/");
    });
  });
});
