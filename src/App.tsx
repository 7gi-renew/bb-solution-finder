// import { useEffect } from "react";
import "./App.css";
// import { GoogleGenAI } from "@google/genai";
// import { fetchData } from "./utils/supabase-function";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Routing/Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
