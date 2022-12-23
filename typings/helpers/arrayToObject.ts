import { KanjiWordData } from "../interfaces/kanji.interface";

export const arrayToObjectForKanjiWordData = (arr: KanjiWordData[]) => {
  const obj: any = {};
  arr.map((ele, index) => {
    obj[`${ele.word}`] = ele.word;
  });
  return obj;
};

export const arrToObjectGeneral = (arr: string[]) => {
  const obj: any = {};
  arr.map((ele, index) => {
    obj[`${ele}`] = ele;
  });
  return obj;
};
