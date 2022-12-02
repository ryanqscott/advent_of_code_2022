const {readFileSync} = require('fs');

const contents = readFileSync(__dirname + '/input', 'utf-8');

let strategyGuide = contents.split('\n');

let score = 0;

let pointsMap = {'X': 1, 'Y': 2, 'Z': 3};
let winMap = {'X': 'C', 'Y': 'A', 'Z': 'B'};
let loseMap = {'X': 'B', 'Y': 'C', 'Z': 'A'};

for (let round of strategyGuide) {
    if (!round) {// disregard blank lines at end of file
        continue;
    }
    let eles = round.split(' ');
    let opponentMove = eles[0];
    let yourMove = eles[1];
    score += pointsMap[yourMove];
    if (winMap[yourMove] === opponentMove) {// Win
        score += 6;
    } else if (loseMap[yourMove] === opponentMove) {// Lose
        score += 0;
    } else {// Draw
        score += 3;
    }
}
console.log(score);