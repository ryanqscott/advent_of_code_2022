const {readFileSync} = require('fs');

const contents = readFileSync(__dirname + '/input', 'utf-8');

let lines = contents.split('\n');

let grid = [];
let scenicScore = 0;
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
                return 0;
            }
            if (grid[i-1][j] < value) {
                return 1 + checkVisible(i-1, j, value, 'n');
            }
            return 1;
        case 's':
            if (!grid[i+1]) {
                return 0;
            }
            if (grid[i+1][j] < value) {
                return 1 + checkVisible(i+1, j, value, 's');
            }
            return 1;
        case 'w':
            if (!grid[i][j-1]) {
                return 0;
            }
            if (grid[i][j-1] < value) {
                return 1 + checkVisible(i, j-1, value, 'w');
            }
            return 1;
        case 'e':
            if (!grid[i][j+1]) {
                return 0;
            }
            if (grid[i][j+1] < value) {
                return 1 + checkVisible(i, j+1, value, 'e');
            }
            return 1;
    }
}

function checkScenicScore(i, j, value) {
    return (checkVisible(i, j, value, 'n') * checkVisible(i, j, value, 'w') * checkVisible(i, j, value, 'e') * checkVisible(i, j, value, 's'));
}

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
        scenicScore = Math.max(scenicScore, checkScenicScore(i,j,grid[i][j]));
    }
}

console.log(scenicScore);