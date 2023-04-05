"use strict";
function sum(a, b) {
    const c = (parseFloat(a) + parseFloat(b)).toString();
    if (isNaN(parseFloat(c))) {
        throw new Error('Parameter is not number');
    }
    return c;
}
module.exports = { sum };
