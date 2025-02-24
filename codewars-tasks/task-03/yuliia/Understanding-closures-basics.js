//https://www.codewars.com/kata/understanding-closures-the-basics/train/javascript

function buildFun(n) {
    var res = [];

    for (var i = 0; i < n; i++) {
        res.push(
            (function (x) {
                return function () {
                    return x;
                };
            })(i)
        );
    }
    return res;
}