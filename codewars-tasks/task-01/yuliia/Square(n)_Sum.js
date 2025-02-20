// https://www.codewars.com/kata/515e271a311df0350d00000f/train/javascript


function squareSum(numbers){
    let result = 0;
    for (num of numbers) {
        result += num * num;
    }
    return result;
}