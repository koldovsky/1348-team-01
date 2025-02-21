// https://www.codewars.com/kata/544a54fd18b8e06d240005c0/train/javascript

function min(arr, mode) { 
    let minValue = Math.min(...arr); 
    let minIndex = arr.indexOf(minValue);
    if (mode === "value") return minValue;
    if (mode === "index") return minIndex;
    
    return undefined; 
  }
  