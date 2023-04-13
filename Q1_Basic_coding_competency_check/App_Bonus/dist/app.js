"use strict";
const main = require('./main');
let a = String(process.argv[2]);
let b = String(process.argv[3]);
console.log("Sum of 2 string! :");
try {
    console.log(a, " +", b, " =", main.sum(a, b));
}
catch (error) {
    console.log(error.message);
}
;
