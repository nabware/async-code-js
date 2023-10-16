// Asynchronous Code in JavaScript

const NUMBERS_API_URL = "http://numbersapi.com";

async function showNumberTrivia() {
  const favNum = 7;
  const response = await fetch(`${NUMBERS_API_URL}/${favNum}?json`);

  const data = await response.json();

  console.log(data.text);
}

async function showNumberRace() {
  const triviaPromises = [];

  for (let i = 0; i < 4; i++) {
    triviaPromises.push(fetch(`${NUMBERS_API_URL}/${i}?json`));
  }

  const response = await Promise.race(triviaPromises);

  const data = await response.json();

  console.log(data.text);
}

async function showNumberAll() {
  const triviaPromises = [];

  for (let i = 0; i < 4; i++) {
    let number = i;

    if (i === 0) {
      number = "WRONG";
    }

    triviaPromises.push(fetch(`${NUMBERS_API_URL}/${number}?json`));
  }

  const settledResults = await Promise.allSettled(triviaPromises);

  const triviaResponses = [];
  const errorMessages = [];

  for (const result of settledResults) {
    const {status, statusText} = result.value;

    if (status === 200) {
      const data = await result.value.json();
      triviaResponses.push(data.text);

    } else if (status === 404) {
      errorMessages.push(statusText)
    }

  }

  console.log(triviaResponses);
  console.log(errorMessages);
}

// showNumberTrivia();
// showNumberRace();
showNumberAll();