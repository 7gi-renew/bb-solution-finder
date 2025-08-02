import { ProblemTypeBase, solutionTypeBase } from "../domain/record";
import { supabase } from "./supabase";

// 課題登録ページ内でデータを保存する処理
export const insertProblemData = async (val1: string, val2: string, val3: string, val4: string, val5: string, val6: string) => {
  const { data, error } = await supabase.from("Problem data").insert({ first_category: val1, first_text: val2, second_category: val3, third_category: val4, last_category: val5, last_text: val6 });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// 結果表示ページで課題データを呼び出す処理
export const fetchProblemData = async () => {
  const response = await supabase.from("Problem data").select("*");

  if (response.error) {
    throw new Error(response.error.message);
  }

  const datas = response.data.map((value) => {
    return ProblemTypeBase.problemType(value.id, value.created_at, value.first_category, value.first_text, value.second_category, value.third_category, value.last_category, value.last_text);
  });

  return datas;
};

// 結果表示ページでデータを保存する処理
export const insertSolutionData = async (val1: string, val2: string, val3: string) => {
  const { data, error } = await supabase.from("Solution Data").insert({ solution_text: val1, practice_text: val2, video_id: val3 });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// 結果表示ページで課題データを呼び出す処理
export const fetchSolutionData = async () => {
  const response = await supabase.from("Solution Data").select("*");

  if (response.error) {
    throw new Error(response.error.message);
  }

  const datas = response.data.map((value) => {
    return solutionTypeBase.problemType(value.id, value.created_at, value.solution_text, value.practice_text, value.video_id);
  });

  return datas;
};
