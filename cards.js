"use strict";

const DECK_OF_CARDS_API_URL = "https://deckofcardsapi.com/api/deck";
const $drawCardButton = $("#draw-card");
const $cardsContainer = $("#cards-container");

let deckId = "";

/*
  Returns deck id of shuffled deck
*/
async function shuffleDeck() {
  const shuffledDeckResponse = await fetch(`${DECK_OF_CARDS_API_URL}/new/shuffle`);

  const {deck_id} = await shuffledDeckResponse.json();

  deckId = deck_id;
}

/*
  Draws new card from deck and displays to DOM
*/
async function handleDrawCardClick(evt) {
  const cardResponse = await fetch(`${DECK_OF_CARDS_API_URL}/${deckId}/draw`);

  const {cards, remaining} = await cardResponse.json();

  if (remaining === 0) {
    $drawCardButton.hide();
  }

  $("<img>")
    .attr("src", cards[0].image)
    .attr("class", "card")
    .appendTo($cardsContainer);
}

shuffleDeck();
$drawCardButton.on("click", handleDrawCardClick);