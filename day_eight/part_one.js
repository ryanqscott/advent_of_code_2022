const {readFileSync} = require('fs');

const contents = readFileSync(__dirname + '/input', 'utf-8');

let lines = contents.split('\n');

let grid = [];
let visibleTrees = 0;
for (let i in lines) {
    if (!lines[i].length) {
        continue;
    }
    grid.push(lines[i].split(''));
}

function checkVisible(i, j, value, direction) {
    switch(direction) {
        case 'n':
            if (!grid[i-1]) {
                return true;
            }
            if (grid[i-1][j] < value) {
                return checkVisible(i-1, j, value, 'n');
            }
            return false;
        case 's':
            if (!grid[i+1]) {
                return true;
            }
            if (grid[i+1][j] < value) {
                return checkVisible(i+1, j, value, 's');
            }
            return false;
        case 'w':
            if (!grid[i][j-1]) {
                return true;
            }
            if (grid[i][j-1] < value) {
                return checkVisible(i, j-1, value, 'w');
            }
            return false;
        case 'e':
            if (!grid[i][j+1]) {
                return true;
            }
            if (grid[i][j+1] < value) {
                return checkVisible(i, j+1, value, 'e');
            }
            return false;
    }
}

function checkVisibleAnyDirection(i, j, value) {
    return (checkVisible(i, j, value, 'n') || checkVisible(i, j, value, 'w') || checkVisible(i, j, value, 'e') || checkVisible(i, j, value, 's'));
}

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
        if (checkVisibleAnyDirection(i,j,grid[i][j])) {
            visibleTrees++;
        }
    }
}

console.log(visibleTrees);