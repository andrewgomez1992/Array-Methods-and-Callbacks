const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

// First you have to create a variable, you can namne it based off of what you know below, so finals2014 comes from all of them
// being in the finals and 2014 is the year of the world cup they are asking for
// then which data are you filtering? fifaData of course... so fifadata.filter() is the next step
// next you need to create a function inside the filter parenthesis(can be done like this or arrow syntax, learn arrow syntax)
// item is just a placeholder you created, you need to use it before calling on your elements
// so now your returning the item.Year if its equal to 2014 and the item.Stage if its equal to Final
// you find the info for the above in the fifa.js file ( or whatever file has your information)
const finals2014 = fifaData.filter(function(item){
    return item.Year === 2014 && item.Stage ==='Final';
});
// console.log(finals2014);
//(a) Home Team name for 2014 world cup final 
// console.log(finals2014[0]['Home Team Name']) // calling finals2014, index 0, and then the key needed
//(b) Away Team name for 2014 world cup final
// console.log(finals2014[0]['Away Team Name'])
//(c) Home Team goals for 2014 world cup final
// console.log(finals2014[0]['Home Team Goals'])
//(d) Away Team goals for 2014 world cup final
// console.log(finals2014[0]['Away Team Goals'])
//(e) Winner of 2014 world cup final */
// console.log(finals2014[0]['Win conditions'])

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

// recieve data as a parameter
// create a variable to be returned
// use your parameter.filter, in this case data.filter()
// next you need to create a function inside the filter parenthesis
// item is just a placeholder, then impliment arrow function syntax to finish function
// what are you returnin (array of objects = item.Stage)
// you want the stage number to be equal to the final stage( in this case Final.. found in fifa.js because thats what they named the key)
function getFinals(data) {
   const result = data.filter((item) => {
    return item.Stage === 'Final';
   });
   return result;
}

// console.log(getFinals(fifaData));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/


// receive an array.. ok easy
// receive a callback function getfinals from task 2... ok, getFinalsCB is the other parameter
// return an array called years
function getYears(array, getFinalsCB) {
    return getFinalsCB(array).map(match => match.Year);
}
// console.log(getYears(fifaData, getFinals));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(data, getFinalsCB) {
    return getFinalsCB(data).map(item => item['Home Team Goals'] > item['Away Team Goals'] ?
    item['Home Team Name'] : item['Away Team Name']);
}

// console.log(getWinners(fifaData, getFinals));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getFinals from task 2
3. Receive a callback function getYears from task 3
4. Receive a callback function getWinners from task 4
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array, getFinalsCB, getYearsCB, getWinnersCB) {
    const finals = getFinalsCB(array, getFinals)
    const winners = getWinnersCB(array, getFinals);
    const years = getYearsCB(array, getFinals);
    return winners.map((item, index) => `In ${years[index]}, ${item} won the world cup!`) 
}

// console.log(getWinnersByYear(fifaData, getFinals, getYears, getWinners));





/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(data) {
   const avNum = data.reduce(function(acc, item){
       return acc + item['Home Team Goals'] + item['Away Team Goals']
   }, 0)
   return (avNum / data.length).toFixed(2);
}

// console.log(getAverageGoals(fifaData));




/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitialsCB) {

    const teamInitials = data.reduce(function(acc, item){
        return acc + item["Home Team Initials"] + item["Away Team Initials"]
    }, 0)
    return (teamInitials / data.length)

}

console.log(getCountryWins(fifaData));



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
