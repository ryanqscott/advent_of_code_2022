const {readFileSync} = require('fs');
const contents = readFileSync(__dirname + '/input', 'utf-8');

const lines = contents.split('\n');

let xIndexH = 0, yIndexH = 0, xIndexT = 0, yIndexT = 0;
let set = new Set();
set.add(xIndexT + "_" + yIndexT);

for (let line of lines) {
    if (!line.length) {
        continue; // skip empty lines in input
    }
    let lineArgs = line.split(' ');
    let direction = lineArgs[0];
    let moves = parseInt(lineArgs[1]);
    switch(direction) {
        case 'U':
            yIndexH+=moves;
            if (touching()) {
                break;
            }
            if (xIndexT < xIndexH) {
                xIndexT++;
            } else if (xIndexT > xIndexH) {
                xIndexT--;
            }
            moveTUntilTouching(direction);
            set.add(xIndexT + "_" + yIndexT);
            break;
        case 'D':
            yIndexH-=moves;
            if (touching()) {
                break;
            }
            if (xIndexT < xIndexH) {
                xIndexT++;
            } else if (xIndexT > xIndexH) {
                xIndexT--;
            }
            moveTUntilTouching(direction);
            set.add(xIndexT + "_" + yIndexT);
            break;
        case 'L':
            xIndexH-=moves;
            if (touching()) {
                break;
            }
            if (yIndexT < yIndexH) {
                yIndexT++;
            } else if (yIndexT > yIndexH) {
                yIndexT--;
            }
            moveTUntilTouching(direction);
            set.add(xIndexT + "_" + yIndexT);
            break;
        case 'R':
            xIndexH+=moves;
            if (touching()) {
                break;
            }
            if (yIndexT < yIndexH) {
                yIndexT++;
            } else if (yIndexT > yIndexH) {
                yIndexT--;
            }
            moveTUntilTouching(direction);
            set.add(xIndexT + "_" + yIndexT);
            break;
    }
}

function touching() {
    if (Math.abs(xIndexH-xIndexT) > 1 || Math.abs(yIndexH-yIndexT) > 1) {
        return false;
    }
    return true;
};

function moveTUntilTouching(direction) {
    switch(direction) {
        case 'U':
            while (!touching()) {
                yIndexT++;
                set.add(xIndexT + "_" + yIndexT);
            }
            break;
        case 'D':
            while (!touching()) {
                yIndexT--;
                set.add(xIndexT + "_" + yIndexT);
            }
            break;
        case 'L':
            while (!touching()) {
                xIndexT--;
                set.add(xIndexT + "_" + yIndexT);
            }
            break;
        case 'R':
            while (!touching()) {
                xIndexT++;
                set.add(xIndexT + "_" + yIndexT);
            }
            break;
    }
}

console.log(set.size);