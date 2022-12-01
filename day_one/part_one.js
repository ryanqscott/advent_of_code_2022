const {readFileSync} = require('fs');

const contents = readFileSync(__dirname + '/input', 'utf-8');

let elfFoodArray = contents.split('\n\n');

let max = 0;

for (let ele of elfFoodArray) {
    let calorieItems = ele.split('\n');
    calorieItems = calorieItems.map(function(str) {
        return parseInt(str);
    });
    let sumCalories = calorieItems.reduce((accum, value) => accum + value);
    max = Math.max(max, sumCalories);
}
console.log(max);