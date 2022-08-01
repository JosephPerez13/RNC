import { Quit, Clear, InputCheck, SplitAnswer, DivisionByZeroCheck, Calculate} from "./scripts/main.js";

describe("Testing Input Check", () =>{
    
    test("Should be true if any of the four operators are entered", () => {
        expect(InputCheck("*")).toBe(true);
        expect(InputCheck("/")).toBe(true);
        expect(InputCheck("+")).toBe(true);
        expect(InputCheck("-")).toBe(true);
    });

    test('Ensuring you can enter numbers with Spaces Between', () => {
        expect(InputCheck("1 2 3 4 5 6 7 8 9 10 ")).toBe(true);
    });

    test("Entering in Decimals", () => {
        expect(InputCheck("1.1 1.1")).toBe(true);
    });

    test('Ensuring you can enter numbers', () => {
        expect(InputCheck("1 5 4 9 10 - + /")).toBe(true);
    });

    test('Ensuring you can enter in One Number', () => {
        expect(InputCheck("1")).toBe(true);
    });

    test('Ensuring you can enter in One Operation', () => {
        expect(InputCheck("-")).toBe(true);
    });

    test('Ensuring you can enter in Negative Numbers and Operations', () => {
        expect(InputCheck("-5 10 +")).toBe(true);
    });

    test("Special Character Check to be false", () => {
        expect(InputCheck("`")).toBe(false);
        expect(InputCheck("~")).toBe(false);
        expect(InputCheck("!")).toBe(false);
        expect(InputCheck("@")).toBe(false);
        expect(InputCheck("#")).toBe(false);
        expect(InputCheck("$")).toBe(false);
        expect(InputCheck("%")).toBe(false);
        expect(InputCheck("^")).toBe(false);
        expect(InputCheck("&")).toBe(false);
        expect(InputCheck("(")).toBe(false);
        expect(InputCheck(")")).toBe(false);
        expect(InputCheck("_")).toBe(false);
        expect(InputCheck("=")).toBe(false);
        expect(InputCheck("{")).toBe(false);
        expect(InputCheck("}")).toBe(false);
        expect(InputCheck("[")).toBe(false);
        expect(InputCheck("]")).toBe(false);
        expect(InputCheck("|")).toBe(false);
        expect(InputCheck(":")).toBe(false);
        expect(InputCheck(";")).toBe(false);
        expect(InputCheck(`"`)).toBe(false);
        expect(InputCheck("'")).toBe(false);
        expect(InputCheck("<")).toBe(false);
        expect(InputCheck(">")).toBe(false);
        expect(InputCheck(",")).toBe(false);
        expect(InputCheck("?")).toBe(false);
    });

    test("Letter Check is expected (Besides Q) to be False", () => {
        expect(InputCheck("a")).toBe(false);
        expect(InputCheck("b")).toBe(false);
        expect(InputCheck("c")).toBe(false);
        expect(InputCheck("d")).toBe(false);
        expect(InputCheck("e")).toBe(false);
        expect(InputCheck("f")).toBe(false);
        expect(InputCheck("g")).toBe(false);
        expect(InputCheck("h")).toBe(false);
        expect(InputCheck("i")).toBe(false);
        expect(InputCheck("j")).toBe(false);
        expect(InputCheck("k")).toBe(false);
        expect(InputCheck("l")).toBe(false);
        expect(InputCheck("m")).toBe(false);
        expect(InputCheck("n")).toBe(false);
        expect(InputCheck("o")).toBe(false);
        expect(InputCheck("p")).toBe(false);
        expect(InputCheck("r")).toBe(false);
        expect(InputCheck("s")).toBe(false);
        expect(InputCheck("t")).toBe(false);
        expect(InputCheck("u")).toBe(false);
        expect(InputCheck("v")).toBe(false);
        expect(InputCheck("w")).toBe(false);
        expect(InputCheck("x")).toBe(false);
        expect(InputCheck("y")).toBe(false);
        expect(InputCheck("z")).toBe(false);
    });

});

describe("Testing the Split Answer Function", () => {

    test('Ensuring it will split the numbers and operations into their own seperate arrays', () => {
        expect(SplitAnswer(" 54 56 75 + - / ", [])).toStrictEqual([[54,56,75],['+','-','/'], false]);
    });

    test('Ensuring it will only Split Numbers into Number Array', () => {
        expect(SplitAnswer("100 450 270", [])).toStrictEqual([[100, 450, 270],[], false]);
    });

    test('Ensuring it will only Split Operations into Operations Array', () => {
        expect(SplitAnswer("+ - / * ", [])).toStrictEqual([[],['+','-','/','*'], false]);
    });

    test('Ensuring it will add existing userNumbers before the new User Numbers', () => {
        expect(SplitAnswer("200 500 100 ", [25, 3])).toStrictEqual([[25,3,200,500,100],[], false]);
    });

    test('Ensuring it will throw an error when double operation is detected', () => {
        expect(SplitAnswer("20 100 50 200 + ++ - ", [])).toStrictEqual([[],[], true]);
    });

    test('Ensuring only spaces will get denied', () => {
        expect(SplitAnswer("          ", [])).toStrictEqual([[],[], true]);
    });

});

describe("Testing Division By Zero Function", () => {

    test('Testing out To make sure it will not trigger if No Zero Detected', () => {
        expect(DivisionByZeroCheck(10,20,'/', [10, 20])).toStrictEqual([false, [10,20]]);
    });

    test('Testing out To make sure it will not trigger if No Division Detected', () => {
        expect(DivisionByZeroCheck(0,20,'*', [0, 20])).toStrictEqual([false, [0,20]]);
    });

    test('Testing out To make sure it will not trigger if No Division Detected', () => {
        expect(DivisionByZeroCheck(0,50,'*', [0, 50])).toStrictEqual([false, [0,50]]);
    });

    test('Testing out To make sure it WILL trigger if Division and Zero Detected', () => {
        expect(DivisionByZeroCheck(100,0,'/', [100, 0])).toStrictEqual([true, [100]]);
    });

    test('Testing out To make sure it WILL trigger if Division and Zero Detected', () => {
        expect(DivisionByZeroCheck(0,70,'/', [0, 70])).toStrictEqual([true, [70]]);
    });
});

describe("Testing Quit and Clear functions", () => {

    test('Ensuring you can quit when entering Q', () => {
        expect(Quit("Q")).toBe(true);
    });

    test('Ensuring you can quit when entering q', () => {
        expect(Quit("q")).toBe(true);
    });

    test("Ensuring you can Clear when Clearing", () => {
        expect(Clear("C", [4,5,6])).toStrictEqual([true,[]]);
    });

    test("Ensuring you can Clear when Clearing", () => {
        expect(Clear("c", [1,2,3])).toStrictEqual([true,[]]);
    });
});

describe("Testing Math Operations", () => {

    test('Ensuring you can Add Properly', () => {
        expect(Calculate("+",3,3,[])).toStrictEqual([6]);
    });

    test('Ensuring you can Subtract Properly', () => {
        expect(Calculate("-",3,3,[])).toStrictEqual([0]);
    });

    test('Ensuring you can Multiply Properly', () => {
        expect(Calculate("*",3,3,[])).toStrictEqual([9]);
    });

    test('Ensuring you can Divide Properly', () => {
        expect(Calculate("/",3,3,[])).toStrictEqual([1]);
    });

    test('Ensuring you can Do Math and have Existing Numbers still show up in right order', () => {
        expect(Calculate("*",5,5,[10])).toStrictEqual([10,25]);
    });
});