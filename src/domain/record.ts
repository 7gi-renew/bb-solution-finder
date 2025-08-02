export class dataTypeBase {
  constructor(public id: number, public created_at: number, public solutionText: string, public solutionArticle: string, public solutionMovie: string) {}

  public static dataType(id: number, created_at: number, solutionText: string, solutionArticle: string, solutionMovie: string): dataTypeBase {
    return new dataTypeBase(id, created_at, solutionText, solutionArticle, solutionMovie);
  }
}

export class ProblemTypeBase {
  constructor(public id: number, public created_at: number, public first_category: string, public first_text: string, public second_category: string, public third_category: string, public last_category: string, public last_text: string) {}

  public static problemType(id: number, created_at: number, first_category: string, first_text: string, second_category: string, third_category: string, last_category: string, last_text: string): ProblemTypeBase {
    return new ProblemTypeBase(id, created_at, first_category, first_text, second_category, third_category, last_category, last_text);
  }
}

export class solutionTypeBase {
  constructor(public id: number, public created_at: number, public solution_text: string, public practice_text: string, public video_id: string) {}

  public static problemType(id: number, created_at: number, solution_text: string, practice_text: string, video_id: string): solutionTypeBase {
    return new solutionTypeBase(id, created_at, solution_text, practice_text, video_id);
  }
}
