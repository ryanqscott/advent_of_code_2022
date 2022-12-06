const {readFileSync} = require('fs');

const contents = readFileSync(__dirname + '/input', 'utf-8');

// helper function to see if duplicate exists
// https://stackoverflow.com/a/54974076
function checkIfDuplicateExists(arr) {
    return new Set(arr).size !== arr.length
}
let stack = [];
for (let i = 0; i < contents.length; i++) {
    if (i < 13) {
        stack.push(contents[i]);
        continue;
    }
    stack.push(contents[i]);
    if (!checkIfDuplicateExists(stack)) {
        console.log(i+1);
        break;
    }
    stack.shift();
}