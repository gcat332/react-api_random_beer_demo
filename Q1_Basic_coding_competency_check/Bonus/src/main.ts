function sum(a:string,b:string):string {
    const c:string = (parseFloat(a)+parseFloat(b)).toString();
    if (isNaN(parseFloat(c))){
        throw new Error('Parameter is not number');
    }
    return c;
}

module.exports = { sum };