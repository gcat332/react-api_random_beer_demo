const main = require('./main')

let a:string = String(process.argv[2]);
let b:string = String(process.argv[3]);

console.log("Sum of 2 string! :")
try {
    console.log(a," +",b," =",main.sum(a,b));
} catch (error:any){
    console.log(error.message);
};
