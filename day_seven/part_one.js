const {readFileSync} = require('fs');

const contents = readFileSync(__dirname + '/input', 'utf-8');

let lines = contents.split('\n');

class Node {
    constructor(name, value, parent, children) {
        this.name = name;
        this.value = value;
        this.parent = parent;
        this.children = children;
    }
}

let currentNode = new Node('/', 0, null, []);
let copyRoot = currentNode;
for (let line of lines) {
    if (!line.length) {// skip empty lines in file
        continue;
    }
    if (line === '$ cd /') { // starting line, unique
        continue;
    }
    switch (line.substring(0,4)) {
        case '$ cd':
            if (line.substring(5,7) === '..') {
                currentNode = currentNode.parent;
            } else {
                for (let i = 0; i < currentNode.children.length; i++) {
                    if (currentNode.children[i].name === line.substring(5)) {
                        let copyNode = currentNode;
                        currentNode = currentNode.children[i];
                        currentNode.parent = copyNode;
                        break;
                    }
                }
            }
            break;
        case '$ ls':// do nothing, we know that files are coming
            break;
        default:
            let parts = line.split(' ');
            if (parts[0] === 'dir') {
                let newNode = new Node(parts[1], 0, currentNode, []);
                currentNode.children.push(newNode);
            } else {// we can actually just add the containing files into the value parameter
                // as we don't care about file names, or number of files
                currentNode.value += parseInt(parts[0]);
            }
            break;
    }
}

function sumChildren(root) {
    if (root.children) {
        root.children.forEach(child => {
            root.value += sumChildren(child);
        });
    }
    return root.value;
}

sumChildren(copyRoot);
let sum = 0;
let maxSize = 100000;
function visitTreeGatherSum(root) {
    if (root.value <= maxSize) {
        sum += root.value;
    }
    if (root.children) {
        root.children.forEach(child => {
            visitTreeGatherSum(child);
        })
    }
}

visitTreeGatherSum(copyRoot);

console.log(sum);