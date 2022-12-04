const {readFileSync} = require('fs');

const contents = readFileSync(__dirname + '/input', 'utf-8');

let cleanupPair = contents.split('\n');
let numOfOverlappingAssignments = 0;
for (let assignment of cleanupPair) {
    if (assignment.length < 1) {// ignoring any blank lines in input
        continue;
    }
    let assignments = assignment.split(',');
    let firstAssignment = assignments[0].split('-');
    let secondAssignment = assignments[1].split('-');
    // checking overlapping conditions
    if (parseInt(firstAssignment[0]) <= parseInt(secondAssignment[0]) && parseInt(firstAssignment[1]) >= parseInt(secondAssignment[1])) {
        numOfOverlappingAssignments++;
    } else if (parseInt(secondAssignment[0]) <= parseInt(firstAssignment[0]) && parseInt(secondAssignment[1]) >= parseInt(firstAssignment[1])) {
        numOfOverlappingAssignments ++;
    }
}
console.log(numOfOverlappingAssignments);