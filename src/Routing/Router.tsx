import { Route, Routes } from "react-router-dom";
import { Home } from "../Home";
import { Register } from "../Register";
import { Result } from "../Result";
import { Archive } from "../Archive";

export function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/" element={<Register />} />
        <Route path="/result/" element={<Result />} />
        <Route path="/archive/" element={<Archive />} />
      </Routes>
    </>
  );
}
