const randomStr = (idx: number | undefined = 8) => {
  const str = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "_", "+", "=", "#"];
  var res = [];
  while (idx--) {
    res.push(str[~~randomNum(0, str.length)]);
  }
  return res.join("");
};
const randomNum = (start: number = 0, end: number = 1) => {
  return Math.random() * (end - start) + start;
};
export default randomStr;
