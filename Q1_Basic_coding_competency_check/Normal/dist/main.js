"use strict";
const sum = (a, b) => {
    const c = (parseFloat(a) + parseFloat(b)).toString();
    if (isNaN(parseFloat(c))) {
        throw new Error('Parameter is not number!');
    }
    return c;
};
try {
    console.log(sum("12", "abc"));
}
catch (error) {
    console.log(error.message);
}
