import { render, screen } from "@testing-library/react";
import App from "../App";

describe("sample-test", () => {
  test("サンプルテスト", () => {
    render(<App />);

    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });
});
