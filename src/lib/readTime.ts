/**
 * 計算文章閱讀時間
 * @param {string} character
 * @returns
 */
const calculate = (character: string = ""): string => {
  const wpm: number = 180;
  const time: number = Math.ceil(character.trim().split(/\s+/).length / wpm);

  return time / 60 + "min read";
};
export default {
  calculate,
};
