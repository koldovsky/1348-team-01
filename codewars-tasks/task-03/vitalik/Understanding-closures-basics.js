//https://www.codewars.com/kata/understanding-closures-the-basics/train/javascript

function buildFun(N) {
    let result = [];
    for (let i = 0; i < N; i++) {
      let current = i;
      result.push(function () {
        return current;
      });
    }
    return result;
  }
  