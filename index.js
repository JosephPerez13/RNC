import { Quit, Clear, InputCheck, SplitAnswer, SaveResults, StartOperation } from "./scripts/main.js";
import inquirer from "inquirer";

let userNumbers = [];

function Welcome() {
    console.log( `
    Welcome to the Calculator for Reverse Polish Notation!
    At the moment we are only able to do the inputs of
    Addition(+), Subtraction(-), Multiplication(*) & Division(/).
    In the future we will be adding in new Operations so be sure to look out for those update emails! 
    
    Some Quick Rules/Tips
    1. Make sure to seperate your Numbers and Operations with a SPACE in between
    2. If no Number is in the List when you enter an operation, you will get an error notifying you need to enter a Number before
        a. Same rule applies if there is Not enough Numbers to complete the amount of operations given.
    3. Please Note! That if you try don't seperate your operation with a space you will get an error as well!
    `)
    Start();
}

async function Start() { 
    let checkForClear, splitAnswerCheck;
    let operations, tmpUserNumbers = [];

    let usersInput = await GetInput();

    if(Quit(usersInput)){ 
        process.exit(1);
    }

    [checkForClear, userNumbers] = Clear(usersInput, userNumbers)
    if(checkForClear){ 
        return Start();
    }

    //Needs to get checked for proper vaules using RegEx
    if(!InputCheck(usersInput)){
        console.log(`
        You have entered in a wrong character to use.
        Please enter in only a Number and/or -, +, / and/or * to continue.
        Or Enter Q if you wish to abandon the game or C to clear your results.
        `)
        return Start();
    }

    //After The input check is validated we split their answer using this function call
    [tmpUserNumbers, operations, splitAnswerCheck] =  SplitAnswer(usersInput, userNumbers);

    if(splitAnswerCheck){
        console.log(`
        Whoops! You seemed to have entered in another Character next a Operation. 
        I don't think you meant to do that. Make sure to seperate your operations with a space in between!
        Please try again from the top! :)
        `)
        return Start();
    }

     //Logic is checking to see if there is any Numbers AND no operations entered in. If so, call Function and start over again
     if(operations.length == 0 && tmpUserNumbers.length > 0){
        userNumbers = SaveResults(tmpUserNumbers);
        return Start();
    }

    //This is completing the normal Objective of a Calculator when Operations are in play.
    if(operations.length < tmpUserNumbers.length) {
        //Calls the StartOperation Function to Start the entire function and Calculating
        StartOperation(operations, tmpUserNumbers)
        userNumbers = SaveResults(tmpUserNumbers);
        return Start();
    } else {
        //To Many Operations and Not Enough Numbers to Finish Calculation
        console.log("Not enough numbers Or Too many Operators.")
        userNumbers = SaveResults(tmpUserNumbers);
        return Start();
    }
}

//Standard Input Getting and setting
async function GetInput() {
    let answers = await inquirer.prompt({
        name: 'userInput',
        type: 'input',
        message: '',
      default() { 
          return 'Enter a Number or Operation please';
      }
  });
  return answers.userInput
}

Welcome();