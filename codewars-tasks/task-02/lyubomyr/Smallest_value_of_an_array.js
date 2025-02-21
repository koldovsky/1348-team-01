// https://www.codewars.com/kata/544a54fd18b8e06d240005c0/train/javascript

const min = (arr, toReturn) =>
  toReturn === "index" ? arr.indexOf(Math.min(...arr)) : Math.min(...arr);
