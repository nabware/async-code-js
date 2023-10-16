"use strict";
// Asynchronous Code in JavaScript

const NUMBERS_API_URL = "http://numbersapi.com";

/**Gets number trivia from Number API */
async function showNumberTrivia(favNum) {
  const response = await fetch(`${NUMBERS_API_URL}/${favNum}?json`);

  const data = await response.json();

  console.log("showNumberTrivia", data.text);
}

/**Gets first response from Numbers API */
async function showNumberRace(nums) {
  const triviaPromises = nums.map(function (num) {
    return fetch(`${NUMBERS_API_URL}/${num}?json`);
  });

  const firstResponse = await Promise.race(triviaPromises);

  const data = await firstResponse.json();

  console.log(data.text);
}

/**Get all number trivia and errors */
async function showNumberAll(nums) {
  const triviaPromises = nums.map(function (num) {
    return fetch(`${NUMBERS_API_URL}/${num}?json`);
  });

  const settledResults = await Promise.allSettled(triviaPromises);

  const triviaResponses = [];
  const errorMessages = [];

  for (const result of settledResults) {
    if (result.status === 'fulfilled') {
      const { ok, statusText } = result.value;

      if (ok) {
        const data = await result.value.json();
        triviaResponses.push(data.text);

      } else {
        errorMessages.push(statusText);
      }
    } else {
      errorMessages.push(result.reason);
    }
  }

  console.log("showNumberAll Trivia", triviaResponses);
  console.log("showNumberAll Errors", errorMessages);
}

/**Runs functions in order */
async function main() {
  await showNumberTrivia(7);
  await showNumberRace([1, 2, 3, 4]);
  await showNumberAll([1, 2, 3, "WRONG"]);

}

// showNumberTrivia();
// showNumberRace();
// showNumberAll();
await main();