const {readFileSync} = require('fs');

const contents = readFileSync(__dirname + '/input', 'utf-8');

let strategyGuide = contents.split('\n');

let score = 0;

let pointsMap = {'A': 1, 'B': 2, 'C': 3};// this is also a 'draw' map
let winMap = {'A': 2, 'B': 3, 'C': 1}; // points awarded for taking the prescribed decision given the opponents choice
let loseMap = {'A': 3, 'B': 1, 'C': 2};

for (let round of strategyGuide) {
    if (!round) {// disregard blank lines at end of file
        continue;
    }
    let eles = round.split(' ');
    let opponentMove = eles[0];
    let yourMove = eles[1];
    switch(yourMove) {
        case 'X': // Must Lose
            score += 0;
            score += loseMap[opponentMove];
            break;
        case 'Y': // Must Draw
            score += 3;
            score += pointsMap[opponentMove];
            break;
        case 'Z': // Must Win
            score += 6;
            score += winMap[opponentMove];
    }
}
console.log(score);