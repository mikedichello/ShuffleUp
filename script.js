const deck = [
    'Card1',
    'Card2',
    'Card3',
    'Card4',
    'Card5',
    'Card6',
    'Card7',
    'Card8',
    'Card9',
    'Card10',
];
const hand = [];
const discardPile = [];
const deckDisplay = document.querySelector('.deck');
const handDisplay = document.querySelector('.hand');
const discardDisply = document.querySelector('.discard');

window.onload = () => {
    shuffleArray(deck);
    updateDisplays();
    document.querySelector('.btn--draw').addEventListener('click', () => {
        draw();
    });
};

/* Randomize array in-place using Durstenfeld shuffle algorithm
https://stackoverflow.com/a/12646864/14890950 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function draw() {
    let drawnCard = deck[deck.length - 1];
    if (deck[0]) hand.push(deck.pop());
    updateDeckSize();
    updateHand(drawnCard);
}

function discard(card) {
    let chosenCard = document.getElementById(card);
    discardDisply.insertAdjacentHTML(
        'beforeend',
        `<span class="card" id="${card}">${card}</span>`
    );
    let index = hand.indexOf(card);
    const discardedCard = hand.splice(index, 1);
    discardPile.push(discardedCard);
    console.log('hand: ' + hand);
    console.log('discard: ' + discardPile);
    chosenCard.remove();
}

function updateDisplays() {
    deckDisplay.innerHTML = `Deck size: ${deck.length}`;
}

function updateDeckSize() {
    deckDisplay.innerHTML = `Deck size: ${deck.length}`;
}

//draws the card as a span element for now the id represents an individual card
//later card id would indicate a card is unique even when it has the same information
function updateHand(card) {
    if(card) {
        handDisplay.insertAdjacentHTML(
            'beforeend',
            `<span class="card" id="${card}" onClick="discard('${card}')">${card}</span>`
        );
    }
}
