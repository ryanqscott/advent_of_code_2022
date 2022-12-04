const {readFileSync} = require('fs');

const contents = readFileSync(__dirname + '/input', 'utf-8');

let rucksacks = contents.split('\n');
let charmap = new Map();
let priorityTotal = 0;

// Utility functions
function isUpperCase(char) {
    if (char.toUpperCase() === char) {
        return true;
    }
    return false;
}
function getPriority(char) {
    if (isUpperCase(char)) {
        return char.charCodeAt(0) - 38;
    }
    return char.charCodeAt(0) - 96;
}
// let rucksackGroup = [];
let teamSize = 3;
let currentMember = 1;
for (let rucksack of rucksacks) {
    if (rucksack.length < 1) { // ignore any empty lines at beginning or end of input file
        continue;
    }
    if (currentMember === 1) {
        for (let item of rucksack) {
            charmap.set(item, true);
        }
        currentMember++;
        continue;
    }
    if (currentMember < teamSize) {
        for (let item of charmap.keys()) {
            if (!rucksack.includes(item)) {
                charmap.delete(item);
            }
        }
        currentMember++;
        continue;
    }
    if (currentMember === teamSize) {
        for (let item of rucksack) {
            if (charmap.get(item)) {
                priorityTotal += getPriority(item);
                charmap.clear();
                currentMember = 1;
                break;
            }
        }
    }
}

console.log(priorityTotal);