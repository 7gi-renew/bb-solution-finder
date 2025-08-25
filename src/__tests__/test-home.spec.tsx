import { render, screen, waitFor } from "@testing-library/react";
import { Home } from "../Home";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigator,
}));

function rendering() {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

describe("HOME画面のテスト", () => {
  test("見出しの文字が存在する", () => {
    rendering();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  test("プライマリボタンが存在する", () => {
    rendering();
    const startBtn = screen.getByRole("button", { name: "はじめる" });
    expect(startBtn).toBeInTheDocument();
  });

  test("プライマリボタンを押下するとregisterページに遷移できる", async () => {
    rendering();
    const startBtn = screen.getByRole("button", { name: "はじめる" });
    userEvent.click(startBtn);
    await waitFor(() => {
      expect(mockNavigator).toHaveBeenCalledWith("/register/");
    });
  });

  test("セカンダリボタンが存在する", () => {
    rendering();
    const startBtn = screen.getByRole("button", { name: "履歴へ" });
    expect(startBtn).toBeInTheDocument();
  });

  test("セカンダリボタンを押下するとarchiveページに遷移できる", async () => {
    rendering();
    const historyBtn = screen.getByRole("button", { name: "履歴へ" });
    userEvent.click(historyBtn);
    await waitFor(() => {
      expect(mockNavigator).toHaveBeenCalledWith("/archive/");
    });
  });
});
