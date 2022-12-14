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


for (let rucksack of rucksacks) {
    if (rucksack.length < 1) { // ignore any empty lines at beginning or end of input file
        continue;
    }
    charmap.clear();
    let containerOne = rucksack.substring(0,rucksack.length/2);
    let containerTwo = rucksack.substring(rucksack.length/2);
    // Entering rucksack one's items into the map
    for (let item of containerOne) {
        charmap.set(item, true);
    }
    // Check each item in rucksack two for any duplicates

    for (let item of containerTwo) {
        if (charmap.get(item)) {
            priorityTotal += getPriority(item);
            break; // there is only one duplicated item type;
        }
    }
}

console.log(priorityTotal);