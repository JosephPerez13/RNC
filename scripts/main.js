const IsEqualToZero = (number) => number == 0;

const InputCheck = (check) => {
    //This Regex is incomplete. It needs to be able to allow Commas. But checking to Ensure that nothing but Numbers and
    //the operations are allowed through
    if(check.match(/[^/\s/\d./*+-]/g)){
        return false
    }
    return true
}

//Splitting the Users Input so that it can be split between Numbers & Operations.
const SplitAnswer = (usersInput, userNumbers) => {
    let operations, tmpUserNumbers = [];

    //This is splitting the userinput to get rid of all the whitespaces and spaces to create a list from that
    usersInput = usersInput.trim().split(' ');

    //This is filtering from the UserInputs to only grab the operations and not the extra space that appears at the end of the array
    operations = usersInput.filter(x => !parseInt(x) && x != 0 && !x.includes('.'))

    //Last minute check to rid of operations with a extra operation or character with it 
    let improper = operations.some( x =>
        x.length > 1
    )
    //Because of Input Check this needed to be added to not add spaces into Number Array. Otherwise it would add a Zero when a space was entered by itself
    if(usersInput[0] == '' || improper){
        operations = []
        improper = true;
        return [tmpUserNumbers, operations, improper]
    }
    //This is splitting the userInput to be apart of the UserNumbers if it is a number and then parsing the Int as to get rid of the operations
    tmpUserNumbers = typeof usersInput === 'string'? parseInt(usersInput) : usersInput.map(Number);

    if(userNumbers.length > 0){
        //Getting existing numbers if they exist and then reversing array so it is not backwards when unshifted into TMPUserNumbers
        userNumbers.reverse().map( x => tmpUserNumbers.unshift(x));
        userNumbers.reverse();
    }
    //This is filtering out the NAN values in the number array
    tmpUserNumbers = tmpUserNumbers.filter(function (value) {
        return !Number.isNaN(value);
    });
    return [tmpUserNumbers, operations, improper]
}

//Saving Results of Users Numbers
const SaveResults = (nums) => {
    console.log("Results", nums)
    return nums;
}

//After Input has been checked for Validation and the proper amount of Operations and Numbers are Given, then this function will be called
const StartOperation = (operations, tmpUserNumbers) => {
    let checkForZero = false;
    operations.map(x => {
        //Grabbing the last two numbers of the array IF present and setting them to last number and secondToLastNumber
        let lastNumber = tmpUserNumbers[tmpUserNumbers.length - 1];
        let secondToLastNumber = tmpUserNumbers[tmpUserNumbers.length - 2];
        //If No Zero is detected then continue with Calculation
        [checkForZero, tmpUserNumbers] = DivisionByZeroCheck(secondToLastNumber, lastNumber, x, tmpUserNumbers)
        if(!checkForZero){
            //If not Zero then splice two previous numbers from tmpUserNumbers and then continue with Calculate function
            tmpUserNumbers.splice(tmpUserNumbers.length - 2,2);
            Calculate(x, secondToLastNumber, lastNumber, tmpUserNumbers);
        }
    });
}
//Handling the check for if we are trying to divide by Zero
const DivisionByZeroCheck = (secondLast, last, operation, tmpUserNumbers) => {
    
    if((secondLast == 0 || last == 0) && operation == '/'){
        SpliceZeroFromArray(secondLast, last, tmpUserNumbers);
        console.log(`
        I apologize but you are unable to divide by 0.
        This puts me in a infinite loop or gives me Bad Energy and I don't like that :/.
        I was able to complete ALL the operations before but did not Divide by 0 when it was detected.
        I have also deleted 0 from the array now as to not cause the error again
        Please try again.
        `)

        return [true, tmpUserNumbers];
    }
    return [false, tmpUserNumbers];
}

//Objective is to splice Zero from Array if it is found on the numbers
const SpliceZeroFromArray = (secondLast, last, tmpUserNumbers) => {
    let indexer;
    if(secondLast == 0) {
        //Finding the Index of the 0 and splicing it from the Array
        indexer = tmpUserNumbers.findIndex(IsEqualToZero)
        tmpUserNumbers.splice(indexer, 1)
    }
    if(last == 0){
        indexer = tmpUserNumbers.findIndex(IsEqualToZero)
        tmpUserNumbers.splice(indexer, 1)
    }
    return tmpUserNumbers;
}


//Calculating the Math based on Operation given
const Calculate = (operation, secondToLastNumber, lastNumber, tmpUserNumbers) => {
    let calcResult;
    switch(operation){
        case '+':
            calcResult = Addition(secondToLastNumber, lastNumber);
            tmpUserNumbers.push(calcResult);
            break;
        case '-':
            calcResult = Subtraction(secondToLastNumber, lastNumber);
            tmpUserNumbers.push(calcResult);
            break;
        case '*':
            calcResult = Multiplication(secondToLastNumber, lastNumber);
            tmpUserNumbers.push(calcResult);
            break;
        case '/':
            calcResult = Division(secondToLastNumber, lastNumber);
            tmpUserNumbers.push(calcResult);
            break;
        default :
        console.log("How did you get here??")
    }
    return tmpUserNumbers;
}
//MATH
const Addition = ( a, b )=> {
    return a + b;
}

const Subtraction = ( a, b ) => {
    return a - b;
}

const Multiplication = ( a, b ) => {
    return a * b;
}

const Division = (a , b ) => {
    return a / b;
}
//End Of Math

//This is a simple Quit Function checking for Q. It can be expanded to do more if Quit.
const Quit = (check) => {
    if(check.toLowerCase().includes('q')) {
        console.log(`
        You have entered in a Command to quit. 
        Sorry to see you go! Hope you didn't leave because of me :(.
        `)
        return true;
    }
    return false;
}

//Clearing the Number array as to not restart the application before attempting again.
const Clear = (check, userNumbers) => {
    if(check.toLowerCase().includes('c')) {
        userNumbers = [];
        console.log(`
        You have entered in a Command to Clear Your Numbers.
        ${userNumbers}
        `)
        
        return [true, userNumbers];
    }
    return [false, userNumbers];
}
export { Quit, Clear, InputCheck, SplitAnswer, SaveResults, StartOperation, Calculate, DivisionByZeroCheck }
