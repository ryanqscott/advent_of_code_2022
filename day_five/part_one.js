const {readFileSync} = require('fs');

const contents = readFileSync(__dirname + '/input', 'utf-8');

let inputs = contents.split('\n\n');// splitting the stacks from the directions
let stacks = [];

let columnRows = inputs[0].split('\n');
// we are only looking for a single character so can just use index and a multiplier factor
let stackNum = 9;
for (let i = 0; i < stackNum; i++) {// Add the starting empty stacks
    stacks.push([]);
};

for (let i = 0; i < columnRows.length; i++) {
    if (columnRows[i][1] === '1') {// throw out the last line of the input containing the column numbers
        break;
    }
    for (let currentStack = 0; currentStack < stackNum; currentStack++) {// iterate over each character, adding it to each stack
        let item = columnRows[i].charAt((currentStack * 4) + 1);
        if (item !== ' ') {
            stacks[currentStack].unshift(item);// we are inserting at the front of the array as otherwise we will be inverting the stack as given
        }
    }
}

// iterate over each command
let commands;
let moveAmount;
let source;
let destination;
let commandLines = inputs[1].split('\n');
for (let line of commandLines) {
    if (!line.length) {// throw out empty lines in input
        continue;
    }
    commands = line.split(' ');
    moveAmount = parseInt(commands[1]);
    source = parseInt(commands[3]);
    destination = parseInt(commands[5]);
    for (let i = 0; i < moveAmount; i++) {
        stacks[destination-1].push(stacks[source-1].pop());
    }
}
let output = [];

for (let stack of stacks) {
    let temp = stack.pop();
    output.push(temp);
}
console.log(output.join(''));