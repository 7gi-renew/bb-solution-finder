export const firstCategoryArray = [
  { name: "打撃", value: "value1" },
  { name: "投球", value: "value2" },
  { name: "守備", value: "value3" },
  { name: "走塁", value: "value4" },
];

export function secondCategoryArray(value: string) {
  const battingFirst = [
    { name: "技術面", value: "batting1" },
    { name: "体力/筋力面", value: "batting2" },
    { name: "メンタル面", value: "batting3" },
  ];

  const pitchingFirst = [
    { name: "技術面", value: "pitching1" },
    { name: "体力/筋力面", value: "pitching2" },
    { name: "メンタル面", value: "pitching3" },
  ];

  const fieldingFirst = [
    { name: "捕球", value: "fielding1" },
    { name: "送球", value: "fielding2" },
    { name: "守備範囲", value: "fielding3" },
    { name: "打球判断", value: "fielding4" },
  ];

  const runningFirst = [
    { name: "盗塁", value: "running1" },
    { name: "走塁", value: "running2" },
    { name: "打球判断", value: "running3" },
  ];

  switch (value) {
    case "打撃":
      return battingFirst;
    case "投球":
      return pitchingFirst;
    case "守備":
      return fieldingFirst;
    default:
      return runningFirst;
  }
}

/***************************
第3階層を出し分けるための条件分岐
*****************************/
// 大元の分岐
export function thirdCategory(value1: string, value2: string) {
  switch (value1) {
    case "打撃":
      switch (value2) {
        case "技術面":
          return [
            { name: "フォーム", value: "value1-1-1" },
            { name: "バットコントロール", value: "value1-1-2" },
            { name: "サインプレー", value: "value1-1-3" },
            { name: "選球眼", value: "value1-1-4" },
          ];
        case "体力/筋力面":
          return [
            { name: "上半身", value: "value1-2-1" },
            { name: "下半身", value: "value1-2-2" },
            { name: "体幹", value: "value1-2-3" },
            { name: "動体視力", value: "value1-2-4" },
          ];
        case "メンタル面":
          return [
            { name: "平常心", value: "value1-2-1" },
            { name: "サインプレー", value: "value1-2-2" },
            { name: "対投手", value: "value1-2-3" },
            { name: "配球", value: "value1-2-4" },
          ];
      }
      break;
    case "投球":
      switch (value2) {
        case "技術面":
          return [
            { name: "制球", value: "value2-1-1" },
            { name: "変化球", value: "value2-1-2" },
            { name: "フォーム", value: "value2-1-3" },
            { name: "配球", value: "value2-1-4" },
          ];
        case "体力/筋力面":
          return [
            { name: "上半身", value: "value2-2-1" },
            { name: "下半身", value: "value2-2-2" },
            { name: "スタミナ", value: "value2-2-3" },
            { name: "怪我予防", value: "value2-2-4" },
          ];
        case "メンタル面":
          return [
            { name: "状況判断", value: "value3-2-2" },
            { name: "平常心", value: "value3-2-3" },
          ];
      }
      break;
    case "守備":
      switch (value2) {
        case "捕球":
          return [
            { name: "ゴロ", value: "value3-1-1" },
            { name: "フライ", value: "value3-1-2" },
            { name: "ライナー", value: "value3-1-4" },
          ];
        case "送球":
          return [
            { name: "動作の速度", value: "value3-2-1" },
            { name: "コントロール", value: "value3-2-2" },
            { name: "体勢", value: "value3-2-3" },
          ];
        case "守備範囲":
          return [
            { name: "打球の追い方", value: "value3-3-1" },
            { name: "守備位置", value: "value3-3-2" },
            { name: "球際", value: "value3-3-3" },
          ];
      }
      break;
    case "走塁":
      switch (value2) {
        case "盗塁":
          return [
            { name: "スタート", value: "value4-1-1" },
            { name: "スライディング", value: "value4-1-2" },
            { name: "投手観察", value: "value4-1-3" },
          ];
        case "走塁":
          return [
            { name: "打席〜一塁", value: "value4-2-1" },
            { name: "進塁", value: "value4-2-2" },
            { name: "帰塁", value: "value4-2-3" },
          ];
        case "打球判断":
          return [
            { name: "進塁", value: "value4-3-1" },
            { name: "帰塁", value: "value4-3-2" },
            { name: "コーチャー", value: "value4-3-4" },
          ];
      }
  }
}

/********************************
最後の階層の選択肢を出し分けるための処理
**********************************/
export function lastCategory(val1: string, val2: string, val3: string) {
  switch (val1) {
    case "打撃":
      switch (val2) {
        case "技術面":
          switch (val3) {
            case "フォーム":
              return [
                { name: "体重移動", value: "value4-1-1-1" },
                { name: "トップの位置", value: "value4-1-1-2" },
                { name: "下半身", value: "value4-1-1-3" },
                { name: "フォロースルー", value: "value4-1-1-4" },
              ];
            case "バットコントロール":
              return [
                { name: "対変化球", value: "value4-1-2-1" },
                { name: "打球方向", value: "value4-1-2-2" },
                { name: "対直球", value: "value4-1-2-3" },
              ];
            case "サインプレー":
              return [
                { name: "バント", value: "value4-1-3-1" },
                { name: "エンドラン", value: "value4-1-3-2" },
                { name: "進塁打", value: "value4-1-3-3" },
              ];
            case "選球眼":
              return [
                { name: "変化球", value: "value4-1-4-1" },
                { name: "直球", value: "value4-1-4-2" },
                { name: "カウント別", value: "value4-1-4-3" },
              ];
          }
          break;
        case "体力/筋力面":
          switch (val3) {
            case "上半身":
              return [
                { name: "肩", value: "value4-2-1-1" },
                { name: "腕", value: "value4-1-1-2" },
              ];
            case "下半身":
              return [
                { name: "腰", value: "value4-2-2-1" },
                { name: "軸足", value: "value4-1-2-2" },
                { name: "軸の逆の足", value: "value4-1-2-3" },
              ];
            case "体幹":
              return [
                { name: "腰", value: "value4-2-3-1" },
                { name: "背筋", value: "value4-1-3-2" },
              ];
            case "動体視力":
              return [
                { name: "対直球", value: "value4-2-4-1" },
                { name: "対変化球", value: "value4-1-4-2" },
                { name: "選球", value: "value4-1-4-3" },
              ];
          }
          break;
        case "メンタル面":
          switch (val3) {
            case "平常心":
              return [
                { name: "得点圏", value: "打撃_平常心_得点圏" },
                { name: "劣勢時", value: "打撃_平常心_劣勢時" },
                { name: "ボールカウント", value: "打撃_平常心_ボールカウント" },
              ];
            case "サインプレー":
              return [
                { name: "バント/スクイズ", value: "打撃_サインプレー_バント/スクイズ" },
                { name: "エンドラン", value: "打撃_サインプレー_エンドラン" },
                { name: "待球", value: "打撃_サインプレー_待球" },
              ];
            case "対投手":
              return [
                { name: "バント/スクイズ", value: "value4-2-3-1" },
                { name: "エンドラン", value: "value4-1-3-2" },
                { name: "待球", value: "value4-1-3-2" },
              ];
            case "配球":
              return [
                { name: "対変化球", value: "value4-2-3-1" },
                { name: "対内角", value: "value4-1-3-2" },
                { name: "対外角", value: "value4-1-3-2" },
              ];
          }
          break;
      }
      break;
    case "投球":
      switch (val2) {
        case "技術面":
          switch (val3) {
            case "制球":
              return [
                { name: "高め", value: "control1" },
                { name: "低め", value: "control2" },
                { name: "内角", value: "control3" },
                { name: "外角", value: "control4" },
              ];
            case "変化球":
              return [
                { name: "スライダー系", value: "brakeball1" },
                { name: "落ちる系", value: "brakeball2" },
                { name: "シンカー/ツーシーム系", value: "brakeball3" },
                { name: "カーブ系", value: "brakeball4" },
                { name: "その他", value: "brakeball5" },
              ];
            case "フォーム":
              return [
                { name: "肘", value: "pitch-form1" },
                { name: "肩", value: "pitch-orm2" },
                { name: "体幹", value: "pitch-form3" },
                { name: "下半身", value: "pitch-form4" },
              ];
          }
          break;
        case "体力/筋力面":
          switch (val3) {
            case "上半身":
              return [
                { name: "肩", value: "release1" },
                { name: "背筋", value: "release2" },
                { name: "インナーマッスル", value: "release3" },
              ];
            case "下半身":
              return [
                { name: "軸足", value: "pitch-leg1" },
                { name: "軸と逆の足", value: "pitch-leg2" },
                { name: "両脚", value: "pitch-leg3" },
              ];
            case "スタミナ":
              return [
                { name: "心肺機能", value: "pitch-leg1" },
                { name: "肩/肘", value: "pitch-leg2" },
                { name: "下半身", value: "pitch-leg3" },
              ];
            case "怪我予防":
              return [
                { name: "肩", value: "pitch-leg1" },
                { name: "肘", value: "pitch-leg2" },
                { name: "下半身", value: "pitch-leg3" },
              ];
          }
          break;
        case "メンタル面":
          switch (val3) {
            case "状況判断":
              return [
                { name: "打順", value: "pitch-leg1" },
                { name: "配球の組み立て", value: "pitch-leg2" },
                { name: "ランナー状況", value: "pitch-leg3" },
              ];
            case "平常心":
              return [
                { name: "ランナー状況", value: "pitch-leg1" },
                { name: "点差", value: "pitch-leg2" },
                { name: "打順", value: "pitch-leg3" },
              ];
          }
          break;
      }
      break;
    case "守備":
      switch (val2) {
        case "捕球":
          switch (val3) {
            case "ゴロ":
              return [
                { name: "前の打球", value: "pitch-leg1" },
                { name: "速い打球", value: "pitch-leg2" },
                { name: "横の打球", value: "pitch-leg3" },
                { name: "バウンド", value: "pitch-leg3" },
              ];
            case "フライ":
              return [
                { name: "外野(前)", value: "pitch-leg1" },
                { name: "外野(後)", value: "pitch-leg2" },
                { name: "内野", value: "pitch-leg3" },
                { name: "キャッチャー", value: "pitch-leg3" },
              ];
            case "ライナー":
              return [
                { name: "外野(前)", value: "pitch-leg1" },
                { name: "外野(後)", value: "pitch-leg2" },
                { name: "二遊間", value: "pitch-leg3" },
                { name: "一三塁", value: "pitch-leg3" },
              ];
          }
          break;
        case "送球":
          switch (val3) {
            case "動作の速度":
              return [
                { name: "握り変え", value: "pitch-leg1" },
                { name: "グラブ捌き", value: "pitch-leg2" },
                { name: "フットワーク", value: "pitch-leg3" },
              ];
            case "コントロール":
              return [
                { name: "近距離", value: "pitch-leg1" },
                { name: "塁間", value: "pitch-leg2" },
                { name: "カットプレー", value: "pitch-leg3" },
              ];
            case "体勢":
              return [
                { name: "ゴロ後", value: "pitch-leg1" },
                { name: "フライ後", value: "pitch-leg2" },
                { name: "反転", value: "pitch-leg3" },
                { name: "中継プレー", value: "pitch-leg3" },
              ];
          }
          break;
        case "守備範囲":
          switch (val3) {
            case "打球の追い方":
              return [
                { name: "前後(内野)", value: "pitch-leg1" },
                { name: "左右(内野)", value: "pitch-leg2" },
                { name: "前後(外野)", value: "pitch-leg3" },
                { name: "左右(外野)", value: "pitch-leg3" },
              ];
            case "守備位置":
              return [
                { name: "対強打者", value: "pitch-leg1" },
                { name: "対巧打者", value: "pitch-leg2" },
                { name: "対俊足", value: "pitch-leg3" },
                { name: "バント/エンドラン警戒", value: "pitch-leg3" },
              ];
            case "球際":
              return [
                { name: "ゴロ", value: "pitch-leg1" },
                { name: "フライ", value: "pitch-leg2" },
                { name: "ライナー", value: "pitch-leg3" },
              ];
          }
          break;
      }
      break;
    case "走塁":
      switch (val2) {
        case "盗塁":
          switch (val3) {
            case "スタート":
              return [
                { name: "軸足", value: "pitch-form1" },
                { name: "意識配分", value: "pitch-orm2" },
                { name: "リード", value: "pitch-form3" },
              ];
            case "スライディング":
              return [
                { name: "足", value: "pitch-form1" },
                { name: "ヘッドスライディング", value: "pitch-orm2" },
                { name: "対牽制", value: "pitch-form3" },
              ];
            case "投手観察":
              return [
                { name: "対右投手", value: "pitch-form1" },
                { name: "対左投手", value: "pitch-orm2" },
              ];
          }
          break;
        case "走塁":
          switch (val3) {
            case "打席〜一塁":
              return [
                { name: "初速", value: "pitch-form1" },
                { name: "スイング", value: "pitch-orm2" },
                { name: "オーバーラン", value: "pitch-orm2" },
              ];
            case "進塁":
              return [
                { name: "塁の回り方", value: "pitch-form1" },
                { name: "走り方", value: "pitch-orm2" },
              ];
            case "帰塁":
              return [
                { name: "牽制", value: "pitch-form1" },
                { name: "タッチアップ", value: "pitch-orm2" },
              ];
          }
          break;
        case "打球判断":
          switch (val3) {
            case "進塁":
              return [
                { name: "内野", value: "pitch-form1" },
                { name: "外野(浅い打球)", value: "pitch-orm2" },
                { name: "外野(長打)", value: "pitch-orm2" },
              ];
            case "帰塁":
              return [
                { name: "タッチアップ", value: "pitch-form1" },
                { name: "ライナーバック", value: "pitch-orm2" },
                { name: "スライディング", value: "pitch-orm2" },
              ];
            case "コーチャー":
              return [
                { name: "進塁(一塁)", value: "pitch-form1" },
                { name: "進塁(三塁)", value: "pitch-orm2" },
                { name: "帰塁(一塁)", value: "pitch-orm2" },
                { name: "帰塁(三塁)", value: "pitch-orm2" },
              ];
          }
          break;
      }
      break;
  }
}
