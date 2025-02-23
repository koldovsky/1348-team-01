//https://www.codewars.com/kata/understanding-closures-the-basics/train/javascript

function buildFun(n){

	let result = []

	for (let i = 0; i< n; i++){
		result.push(()=>i);
	}
	return result;
}