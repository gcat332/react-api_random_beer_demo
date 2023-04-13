const func = require('./main')

describe('testing main file', () => {
    test('a="12" + b="2" => "14"!', () => {
        expect(func.sum("12", "2")).toBe("14");
    });

    test('a="12" + b="abc" => Throw Error!', () => {
    try {
        func.sum("12", "abc")
    } catch(error){
        expect(error.message).toBe("Parameter is not number");
    }
    });
});
