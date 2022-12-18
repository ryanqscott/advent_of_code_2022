const {readFileSync} = require('fs');
const contents = readFileSync(__dirname + '/input', 'utf-8');

const lines = contents.split('\n');
let ropeLength = 10;
let ropePieces = [];

for (let i = 0; i < ropeLength; i++) {
    ropePieces.push([0,0]);
}
let set = new Set();

function resultingMove(direction, amount) {
    let movement = [];
    switch(direction) {
        case 'U':
            movement = [0,amount];
            break;
        case 'D':
            movement = [0, -amount];
            break;
        case 'R':
            movement = [amount, 0];
            break;
        case 'L':
            movement = [-amount, 0];
            break;
    }
    return movement;
}

function moveRope(direction, amount) {
    let move = resultingMove(direction, amount);
    let newHeadPosition = [ropePieces[0][0] + move[0], ropePieces[0][1] + move[1]];
    const dx = Math.sign(move[0]);
    const dy = Math.sign(move[1]);
    while(JSON.stringify(ropePieces[0]) !== JSON.stringify(newHeadPosition)) {
        // first move head here
        // then look down the chain
        ropePieces[0][0] += dx;
        ropePieces[0][1] += dy;
        for (let ropeIndex in ropePieces) {
            let currentHead = ropePieces[parseInt(ropeIndex)];
            let currentTail = ropePieces[parseInt(ropeIndex)+1] || null;
            if (!currentTail) {
                set.add(currentHead[0] + "_" + currentHead[1]);
                continue;
            }
            if (touching(currentHead, currentTail)) {
                continue;
            }
            for (let k = 0; k < 2; k++) {
                if (Math.abs(currentHead[k] - currentTail[k]) > 0) {
                    currentTail[k] += Math.sign(currentHead[k] - currentTail[k]);
                }
            }
        }
    }
}

for (let line of lines) {
    if (!line.length) {
        continue; // skip empty lines in input
    }
    let lineArgs = line.split(' ');
    let direction = lineArgs[0];
    let moves = parseInt(lineArgs[1]);
    moveRope(direction, moves);
}

function touching(pointOne, pointTwo) {
    if (Math.abs(pointOne[0] - pointTwo[0]) > 1 || Math.abs(pointOne[1] - pointTwo[1]) > 1 ) {
        return false;
    }
    return true;
}

console.log(set.size);