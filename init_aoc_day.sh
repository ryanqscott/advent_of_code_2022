#!/usr/bin/env bash

cookie=$AOC_SESSION_COOKIE # Set this to your AOC session cookie as an env variable, this can be found by logging in with a browser and looking at the application tab in devtools on Chrome or the Storage tab in Firefox.
# The session cookies for AOC have lifespans that span roughly the full event (a month+) and so this isn't worth automating, and the creator of AOC advises against automating this as well.
day=$1
boilerplate="const {readFileSync} = require('fs');\nconst contents = readFileSync(__dirname + '/input', 'utf-8');"

mkdir "day_$day" || echo "directory already exists, continuing"
cd "day_$day"

if [ -s input ]; then
	echo "input file already exists"
else
	touch input
	curl --request GET --url https://adventofcode.com/2022/day/$day/input --cookie "session=$cookie" > input
fi

if [ -s part_one.js ]; then
	echo "part_one.js file already exists"
else
	touch part_one.js
	echo -e "$boilerplate" > part_one.js
fi

if [ -s part_two.js ]; then
	echo "part_two.js file already exists"
else
	touch part_two.js
	echo -e "$boilerplate" > part_two.js
fi

