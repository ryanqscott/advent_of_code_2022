const {readFileSync} = require('fs');

const contents = readFileSync(__dirname + '/input', 'utf-8');

let elfFoodArray = contents.split('\n\n');

let max = 0;
let k = 3;// the top k snackers
let topAmounts = [];// the question asks for the top 3, even though the answer box is looking for the total of the top 3
// so I will find both
let totalMax = 0;
let elfMaxFoodIndex = -1;
while (topAmounts.length < k) {
    for (let i = 0; i < elfFoodArray.length; i++) {
        if (!elfFoodArray[i]) {
            continue;
        }
        let calorieItems = elfFoodArray[i].split('\n');
        calorieItems = calorieItems.map(function(str) {
            return parseInt(str);
        });
        let sumCalories = calorieItems.reduce((accum, value) => accum + value);
        if (sumCalories > max) {
            elfMaxFoodIndex = i;
            max = sumCalories;
        }
    }
    topAmounts.push(max);
    totalMax += max;
    elfFoodArray[elfMaxFoodIndex] = 0;
    max = 0;

}
console.log(topAmounts);
console.log(totalMax);