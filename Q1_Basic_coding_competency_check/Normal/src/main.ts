
const sum = (a:string,b:string):string => {
    const c:string = (parseFloat(a)+parseFloat(b)).toString();
    if (isNaN(parseFloat(c))) {
        throw new Error('Parameter is not number!')
    }
    return c;
}


try {
    console.log(sum("12","abc"));
} catch (error:any) {
    console.log(error.message);
}