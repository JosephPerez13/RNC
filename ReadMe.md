# CLI Reverse Notation Calculator

## Background

This will be a quick guide through the process of how this Reverse Notation Calculator was created and the ideas behind it. I imagine you might know what that is but if not let me explain.

Normally in a regular Calculator we do “3 + 3” to get “6”.  However, in a Reverse Notation Calculator you would instead do something like “3 3 +” which would still get you “6”! This is a small example but hopefully this gives you an idea of what a Reverse Notation Calculator main goal is.

## Project Dependencies / Installations

REQ (Used for grabbing Users Input) - Inquirer - `npm install inquirer`

DEV (Testing and is only Req for Dev)- Babel - `npm install --save-dev babel-jest`

`npm install @babel/preset-env --save-dev`

Dev(Main portion for Testing for Dev)- Jest - `npm install --save-dev jest`

## Things to know before getting Started

You will need to do `npm install`  into the terminal to be able to get the project running with the appropriate Dependencies for the project.

After installing this you should now see a node modules folder pop up in your hierarchy.

This should be all that is needed for starting the application

## Starting the Code

After you have installed the necessary installations you are now ready to start the application!

In the terminal write out the command `node .` and this will start the project to run in the terminal. Once the opening text has appeared you are now able to use the calculator as you would like!

## Solution

So my solution evolved around checking the users first and continuous input to understand if they wanted to Quit, Clear, or Use the calculator as intended.

### Step By Step of Code Walk through

This is the prompt function which will be the main function called to start instructions and the rest of the application

![Screen Shot 2022-08-01 at 11.02.30 AM.png](CLI%20Reverse%20Notation%20Calculator%20e6172a3f7ecf4e8e9e33ed8751e660b8/Screen_Shot_2022-08-01_at_11.02.30_AM.png)

So to start, after the `Welcome()` function is called. Based on the usersInput from  `GetInput()` decides what is the next appropriate steps in my `Start()` function

![Screen Shot 2022-08-01 at 2.38.33 AM.png](CLI%20Reverse%20Notation%20Calculator%20e6172a3f7ecf4e8e9e33ed8751e660b8/Screen_Shot_2022-08-01_at_2.38.33_AM.png)

So from there I decided to check for Quit and Clear immediately as to not do any unnecessary checking with the RegEx. If they did Quit or Clear then I used Recursion to Start the loop over and possibly reset the UserNumbers if they wanted to clear it.

![Screen Shot 2022-08-01 at 2.17.49 AM.png](CLI%20Reverse%20Notation%20Calculator%20e6172a3f7ecf4e8e9e33ed8751e660b8/Screen_Shot_2022-08-01_at_2.17.49_AM.png)

After the user has given an input that is not “Q” || “q” or “C” || “c” then, the function will carry on to the `InputCheck()` function. This is where the main logic check for ensuring that no Alphabets or Special characters (besides from the ones allowed “`+ / * -`”) are not permitted and will return false if the users input is invalid.

The `check.replace()` is replacing all the Spaces in the string to be empty as to not mess up the regular expression check. If there were spaces in the `check.Match()` then it would not pass and end up returning false.

(Note: The regex will not allow Commas at this time)

![Screen Shot 2022-08-01 at 2.21.36 AM.png](CLI%20Reverse%20Notation%20Calculator%20e6172a3f7ecf4e8e9e33ed8751e660b8/Screen_Shot_2022-08-01_at_2.21.36_AM.png)

After that function finishes the next function to be called is `SplitAnswer`. This function is used both as a last minute check for any special cases that might went through input check and also to split the answers into operations or numbers.

1. Starting off in this function will trim the whitespaces before and after the numbers/operations and then split by the spaces in between the numbers/operations.
2. From there we filter out anything that is not a number and not 0 into Operations.
3. Improper is used for the double check. It is checking to see that no double operation has been entered and that there is only one operation per item in the operations Array. So that is why we are checking for length greater than 1 which will stop the function and provide an error for them to view. `usersInput[0] == ‘’` is checking to ensure that empty values will not be added into TmpUserNumbers and returning the function if it is caught.
4. Next step is to check whether they entered in only one number or multiple numbers! So if the user just entered in “5” then that is a string and I can `parseInt()` a string into the TmpUserNumbers since 5 is a Number. If they enter in “5 5” then it will become an object and therefore I can now do a .map on the usersInput to only get types of `Number`.
    1. Also if you are understanding the logic then yes, at this time if we enter in “+” then that will be added into the `TmpUserNumbers` array as a `NaN`.
    2. To Combat said error, we Filter through the array to only get Numbers that don’t have the value of `NaN`. So now TmpUserNumbers will never have anything but numbers in the Array.
5. The Second to last Step in this function is checking for any existing numbers and adding them to the front of the TmpUserNumbers array. This function is used for adding in previous calculations if they were to continually use the calculator over and over
6. After all that you will return `tmpUserNumbers`, `operations` and `improper` boolean.

![Screen Shot 2022-08-01 at 2.31.28 AM.png](CLI%20Reverse%20Notation%20Calculator%20e6172a3f7ecf4e8e9e33ed8751e660b8/Screen_Shot_2022-08-01_at_2.31.28_AM.png)

If `Improper` is `true` then it will fire the console log to notify them that they entered in the wrong numbers and or characters. Then start the recursion loop over again as they need to enter in valid inputs before entering the calculation portion.

![Screen Shot 2022-08-01 at 2.40.32 AM.png](CLI%20Reverse%20Notation%20Calculator%20e6172a3f7ecf4e8e9e33ed8751e660b8/Screen_Shot_2022-08-01_at_2.40.32_AM.png)

I am now going to explain the next 3 conditional checks which decides the fate of where to go after all input has been validated with the proper inputs.

1. The way the first conditional check works is that it is checking for any numbers in the array with NO operations! If this is true then Save the results into usersNumbers and start the loop over. This is equivalent to entering in “5” enter, “20” enter, “30” enter e.t.c. Only one number has been sent as the usersInput
2. The second loop checks to ensure that you have enough numbers to continue with the math without having too many operators or too few numbers. If there is less operations than numbers than it is safe to continue with the Math portion as this will not break the calculator. Once this is checked it will called `StartOperation()` which is what starts the magic.
3. This else is the catch all for when there is not enough numbers for operations. It is notifying the user that we are unable to complete that action because it would return an empty or array or break the code as you can not do math with `‘’`. After it saves the results of all the numbers previously and the starts the recursion loop over again.

![Screen Shot 2022-08-01 at 2.40.46 AM.png](CLI%20Reverse%20Notation%20Calculator%20e6172a3f7ecf4e8e9e33ed8751e660b8/Screen_Shot_2022-08-01_at_2.40.46_AM.png)

Once the function `StartOperation()` I will be declaring a boolean that is only checking for `DivisionByZeroCheck()` which is checking to ensure we are not dividing by zero.

After that we will now map through Operations to see what is the first operation they want to do in their calculator. We then grab the last two array spots of the `tmpUserNumbers` and set them to the variables of `lastNumber` and `secondToLastNumber`.

`DivisionByZeroCheck()` is fired and if there is a Division and 0 detected it will splice out that zero and return true to checkForZero which will not calculate anything as to not get `infinity` as an answer when dividing by zero.

If they are NOT trying to divide by zero then it will splice out the last two numbers from tmpUserNumbers (as we already have them saved into `lastNumber` and `secondToLastNumber` ) and then send over the numbers with operation to calculate the data to get the answer!

![Screen Shot 2022-08-01 at 2.42.32 AM.png](CLI%20Reverse%20Notation%20Calculator%20e6172a3f7ecf4e8e9e33ed8751e660b8/Screen_Shot_2022-08-01_at_2.42.32_AM.png)

This calculate function is using the `operations, secondToLastNumber, lastNumber & TmpUserNumbers` and doing a switch case to figure out which Mathematical function to call.

From there it will return the result of that Mathematical equation and push it into TmpUserNumbers array to be at the end of the array. Which will continue the logic of the calculator until there are no more operations in the operation map

![Screen Shot 2022-08-01 at 2.42.57 AM.png](CLI%20Reverse%20Notation%20Calculator%20e6172a3f7ecf4e8e9e33ed8751e660b8/Screen_Shot_2022-08-01_at_2.42.57_AM.png)

## Reasoning

Originally I had planned to make all of this on one page but as I got near the end and wanted to work on testing I realized that I was going to be unable to do both of those. So to ensure testing would work like it should I separated the functions as to not have anything unnecessary on the `index.js` page and have everything on the `main.js` page.

Main Reason for this was due to Inquirer. I was unable to test out on the same file that uses imports from other dependencies. So with that in mind I separated the inquirer function from all the stuff that I would want to test without entirely breaking my application. So the index.js page is now mostly console.logs and calling to the functions in the `Main.js` . Now the Main.js has everything needed to test the application without needing to worry about the front end.

Another reason I chose this style was to make the code easier to read and understand while also being able to debug the code with precision. Having a function do too many things makes it hard to debug and find the real root of the issue sometimes. So breaking up the functions as to not have too much clutter and a main goal is the best approach.

## Trade-Offs

There is some things I would have liked to get under control more which is the input check. I would have liked to able to get the input check to work more properly and ONLY allow the proper characters with a space in between with NO touching operations. If I was able to get this done properly then I wouldn’t need to do any other checks of input and the code can get improvised even more so.

The other function I would have like to improvise more is the `SplitAnswer()`function. This function does it’s entire job but I feel like this cam be improved so much more to make it even more compatible and quicker.

If I had more time I would have loved to get most if not the entire thing working with `const` instead of `lets`. Doing this I would have much more faith in the applications longevity and how it can be evolved into using other operations besides the 4 basic operators. If I were to do this differently, then I would change some of the objects being returned from the functions as they do make testing harder to complete. Maybe having a boolean that will return true or false depending on if the function has been completed instead of an object with multiple values will be easier to test and develop going further

## Running Tests

To Start running your tests, be sure to install babel and jest from the above installations to be able to continue with the testing!

After you have installed those CLI commands then you are ready to go to next step.

Go to your Package.json file and add in this line of code underneath “`”type”: “module”`”

![Screen Shot 2022-08-01 at 2.01.09 AM.png](CLI%20Reverse%20Notation%20Calculator%20e6172a3f7ecf4e8e9e33ed8751e660b8/Screen_Shot_2022-08-01_at_2.01.09_AM.png)

This will allow the input of node test to target the jest installation we installed earlier. This part is important so be sure to do this before continuing to the next step!

After completing the previous step you will know need to create a new file called  `.babelrc` file into the root of the hierarchy. In this new file you will add in the following code to be able to use the babel environment.

![Screen Shot 2022-08-01 at 2.03.39 AM.png](CLI%20Reverse%20Notation%20Calculator%20e6172a3f7ecf4e8e9e33ed8751e660b8/Screen_Shot_2022-08-01_at_2.03.39_AM.png)

Once that is all done you should now be able to run `node test` in the terminal and you will now see tests either being approved or denied by the current tests on the `main.test.js` file.