// Async code executes after a task that runs in the bg finishes
// async code is non-blocking
// other code doesnt wait for async task to finish its work

// AJAX = Asynchronous Js And Xml - allows to communicate with remote web servers in async way, requesting daya from the server dynamically
// AJAX name is a relic is an old name bc xml was widely used, now it is largely replaced with JSON



// ----------------- OLD SCHOOL AJAX Request ---------------------------------------
'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();
//   // console.log(request.responseText);
//   request.addEventListener('load', function(){
//     console.log(this.responseText);  //this.responseText is JSON data, a string, so we need to convert it to a JS Object
//     // const data = JSON.parse(this.responseText); // parses JSON data from string, to JS object(s) contained in array
//     const [data] = JSON.parse(this.responseText); // destructure - same as doing => data = JSON.parse(this.responseText)[0]
//     console.log(data);  // now 'data' is a JS object inside of an array

//     // create string literal from async data
//     const html = `
//       <article class="country">
//       <div class="country__data">
//         <h3 class="country__name">${data.name.common}</h3>
//         <h4 class="country__region">${data.region}</h4>
//         <p class="country__row"><span>👫</span>${(
//           +data.population / 1000000
//         ).toFixed(1)} people</p>
//         <p class="country__row"><span>🗣️</span>${JSON.stringify(data.languages)}</p>
//         <p class="country__row"><span>💰</span>${JSON.stringify(data.currencies)}</p>
//       </div>
//     </article> 
//     `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   })
// }

// getCountryData('Portugal');
// getCountryData('usa');
// getCountryData('japan');

// ----------------- END  -- OLD SCHOOL AJAX Request ---------------------------------------


// ----------------- NEWER Promises w Fetch API -------------------------------------------

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

// is replaced with 

// const request = fetch(`https://restcountries.com/v3.1/name/portugal`)

// console.log(request); // will return a Promise-pending


const renderCountry = function (data, className = '') {
    const html = `
      <article class="country" ${className}>
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${JSON.stringify(data.languages)}</p>
        <p class="country__row"><span>💰</span>${JSON.stringify(data.currencies)}</p>
      </div>
    </article> 
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

// Promise = An object that is used as a placeholder for the future result of an asynchronous operation
    // OR simpler = a container for an async delivered value
      // OR even simpler = a container for a future value (where a future value could be seen as a response from an AJAX call)


// Promise as lottery ticket example
  // I buy lotto ticket(promise) => lottery draw happens asynchornously => if correct outcome, I receive money because it was promised

// Promise value added
  // instead of nesting AJAX requests & scaffolding callback hell, can chain promises for a sequence of async operations, escaping callback hell

/**
 * THE PROMISE LIFECYCLE
 * 
 * 1. Promise is pending (you buy lotto ticket)
 * 2. Async task working in background (lotto drawing)
 * 3. Promise is settled (async task has completed / lotto drawing result known)
 *    **IMPORTANT - A promise is only settled(fulfileld or rejected) once, and after that state will remain unchanged forever(unlike streams that can continually be updated)
 * 
 * TWO TYPES of settled promises
 * 3.a. Fulfilled (sucessfully resulted in expected value / chose winning lotto ticket- win) ** .then ONLY called when promise fulfilled
 * 3.b. Rejected (error during async task / wrong lotto ticket chosen-fail) ** .catch ONLY called when promise rejected
 * 
 * 4. Finally - if included, called no matter if fulfilled or rejected - perfect for displaying loading spinners
 *
 * BUILD & CONSUME PROMISE
 *
 * Build promise - promise is built using fetch API 
 * 
 * Consume promise - the promise is returned from the fetch API and consumed, but in order to consumed, promise must first be built(kind of like new Observable/observer)
 * 
 */







// CONSUMING PROMISES ----------------------------------------------------------------------------
  // .then is a method for the expecation of a fulfilled/sucessful promise

// const getCountryData = function(country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response){
//     console.log(response); // response body will only be a readable stream, not actual content/data, so will need to call JSON method to parse data 
//                            // ***** however, the readable stream IS a resolved value, so it does have the JSON method attached to it for use
//     return response.json()  // confusing in nature how implemented in promises...but .json is also a promise itself, so to get value you need to return and chain another then callback function
//   }).then(function(data) {
//     console.log(data);  //response.json returns promise, so then function to unpack fulfilled/successful promise
//     renderCountry(data[0]);
//   })
// }

// getCountryData('portugal');









// CONSUMING PROMISES - SIMPLIFIED W/ Arrow Functions (thus if 1 line automatically returns) ----------------------

// const getCountryData = (country) => {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//   .then(response => response.json())
//   .then(data => renderCountry(data[0]));
// }

// getCountryData('portugal');









// CHAINING PROMISES - to render neighboring countries of initial country ------------------------------------------

// const getCountryData = (country) => {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//   .then(response => response.json())
//   .then(data => {
//     renderCountry(data[0]);
//     const neighbor = data[0].borders?.[0]; // chaining promises and also (?) optional chaining to preclude if statement if no neighboring countries
//     console.log(neighbor);


//     // Country 2
//     return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`); // ALWAYS return the promise and then continue the chain with .then - or else your going into callback hell 
//                                                                       //within same .then that we were in effect trying   to avoid in basic AJAX calls to begin with
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log([data]);
//       return renderCountry(data[0], 'neighbor')
//     })
// }

// getCountryData('usa');










// CHAINING PROMISES + ERROR HANDLING + FINALLY   ----------------------------------------------------------------------------

// const getCountryData = (country) => {
//   // Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//   .then(
//     response => response.json(),
//     err => alert(err)  // BASIC AND NOT PREFERRED - error catch method 1 within then statement - specific to the then statement and would need repeating in each .then
//   )
//   .then(data => {
//     renderCountry(data[0]);
//     const neighbor = data[0].borders?.[0];

//     if (!neighbor)
//       throw new Error('Neighbor not found')  // Manually throwing error within then callback function, this will immediately reject this specificic promise, 
//                                              //then travel down the chain until it is eventually caught by the global catch method
//     // Country 2
//     return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0], 'neighbor'))
//     .catch(err => console.error(`${err.message} 💥💥💥💥 ${err}`))  // PREFERRED! - Global catch method, triggered upon error in any .then statement
//     .finally(()=>{    // Finally if used, called no matter if promise fulfilled or rejected - PERFECT PLACE for loading spinners to be activated
//       countriesContainer.style.opacity = 1;
//     })
// }

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });






// GET JSON Helper Function, fetch, error handling and json conversion -------------------------------------------------------------

const getJSON = function(url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`)
    return response.json();
  });
};


const getCountryData = (country) => {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
  .then(data => {
    renderCountry(data[0]);
    const neighbor = data[0].borders?.[0];

    if (!neighbor) throw new Error("No neighbour found!");
    
    // Country 2
    return getJSON(`https://restcountries.com/v3.1/alpha/${neighbor}`, 'Country not found');
    })
    .then(data => renderCountry(data[0], 'neighbor'))
    .catch(err => console.error(`${err.message} 💥💥💥💥 ${err}`))  // PREFERRED! - Global catch method, triggered upon error in any .then statement
    .finally(()=>{    // Finally if used, called no matter if promise fulfilled or rejected - PERFECT PLACE for loading spinners to be activated
      countriesContainer.style.opacity = 1;
    })
}

btn.addEventListener('click', function () {
  getCountryData('portugal');
});








// BUILDING A PROMISE ------------------------------------------------------------------------------------------


// Promises are just a built-in JS object, where the promises constructor, takes one argument, an executor function, which takes 2 arguments, resolve and reject

// const lotteryPromise = new Promise(function(resolve, reject){

//   console.log('Lottery Draw is Happening 🔮');
//   setTimeout(function() {
//     if (Math.random() >= 0.5) {
//       resolve('YOU WIN 🙌')  // if random number >= then resolved/promise is fulfilled!!!!
//     } else {
//       reject(new Error('You lost your money 💩'))
//     }
//   }, 2000 )
// })

// consuming build promise

// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// promisifying - to convert callback based async behavior to promise based
// the wait function below is much like the fetch function... you call a function that returns a promise

// const wait = function(seconds) {
//   return new Promise(function(resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

//consume wait promise
// wait(2)
//   .then(()=> {
//     console.log('I waited for 2 seconds');
//     return wait(1);
// })
// .then(() => console.log('I waited for 1 second'));







// ASYNC/AWAIT - Even better way to consume promises since ES2017---------------------------------------------------------------------------------
    // ASYNC/AWAIT is really just promises/.then as syntactic sugar, so still using promises, just consuming them in a different way
// create async function, a function that will keep running in the background(not blocking single thread & call stack), while performing the code inside of it - when function is done it automatically returns a promise
// const whereAmI = async function(country) {
  // inside async function can have 1 or more await statements
  // you await a promise. in this case the promise being awaited is returned by the fetch function...because fetch api returns a promise, not the actual data.
//   const res = await fetch(`https://restcountries.com/v3.1/name/${country}`); // as soon as promise resolved, then the value of the whole await expression is the resolved value of the promise, which gets stored to the variable
//   console.log(res);
//   const data = await res.json(); //still need to get JSON from response, which we use await because .json method's nature is to return a promise
//   console.log(data[0]);
// }
// whereAmI('portugal')
// console.log('FIRST');





// ASYNC/AWAIT - and adding traditional try/catch statements(try/catch should always be added to async await functions) --------------------------------

// Basic try catch format
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch(err) {
//   alert(err.message)
// }

// const whereAmI = async function(country) {
//   try {
//     const res = await fetch(`https://restcountries.com/v3.1/name/${country}`); 
//     console.log(res);
//     const data = await res.json();
//     console.log(data[0]);
//   }
//   catch (err) {
//     console.error(err)
//   }
// }
// whereAmI('portugal')
// console.log('FIRST');





// ASYNC/AWAIT - Returning Values ---------------------------------------------------------------------------------

const whereAmI = async function(country) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`); 
    console.log(res);
    const data = await res.json();
    console.log(data[0]);
    return `The capital is ${data[0]?.capital[0]}`
}

// console.log('1: Will get location');
// const city = whereAmI('portugal') 
// console.log(city); //logs pending promise bc run before async returns value
// console.log('3: Finished getting location');

// console.log('1: Will get location');
// whereAmI('portugal').then(city => console.log(city)) // can do this but mixing old promises(.then) and async function...cleaner to just use async
// console.log('3: Finished getting location');

// best to use iffy async function
// console.log('1: Will get location');
// (async function () {
//   try {
//     const city = await whereAmI('portugal');
//     console.log(`2: ${city}`); 
//   } catch (err) {
//     console.error(`2: ${err.message}`);
//   }
//   console.log(`3: Finished getting the location`);
// })();



// ASYNC/AWAIT - Running promises in parallel ------------------------------------------------------------------------

const get3Countries = async function(c1, c2, c3) {
  try {
    const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    console.log(data1.capital[0], data2.capital[0], data3.capital[0]);
  } catch(err) {
    console.error(err)
  }
}
get3Countries('portugal', 'canada', 'tanzania')