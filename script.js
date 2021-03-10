// ------------Initiation----------
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
const discardPileDisplay = document.querySelector('.discard');

window.onload = () => {
    shuffleArray(deck);
    updateDisplays();
    document.querySelector('.btn--draw').addEventListener('click', () => {
        draw();
    });
    document.querySelector('.btn--reset').addEventListener('click', () => {
        reset();
    });
};

// ------------Controller----------

/* Randomize array in-place using Durstenfeld shuffle algorithm
https://stackoverflow.com/a/12646864/14890950 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function draw() {
    if (deck[0]) hand.push(deck.pop());
    updateDeckSize();
    updateHand();
}

function discard(card) {
    let index = hand.indexOf(card);
    const discardedCard = hand.splice(index, 1);
    discardPile.push(...discardedCard);
    updateHand();
    updateDiscardPile();
}

function reset() {
    deck.push(...hand.splice(0));
    deck.push(...discardPile.splice(0));
    shuffleArray(deck);
    updateDisplays();
}

// ------------View----------
function updateDisplays() {
    updateDeckSize();
    updateHand();
    updateDiscardPile();
}

function updateDeckSize() {
    deckDisplay.innerHTML = `Deck size: ${deck.length}`;
}

function updateHand() {
    // select all of visible hand
    const visualHand = document.querySelector('.hand').children;
    // remove all card no longer in hand array
    cleanZone(visualHand);
    // add cards in hand array that are not yet visible
    for (const card of hand)
        if (!visualHand.namedItem(card))
            handDisplay.insertAdjacentHTML(
                'beforeend',
                `<span class="card" id="${card}" onClick="discard('${card}')">${card}</span>`
            );
}

function updateDiscardPile() {
    // get all of visible discard pile
    const visualDiscardPile = document.querySelector('.discard').children;
    // remove all cards no longer in discardPile array
    cleanZone(visualDiscardPile);
    // add cards in discardPile array that are not yet visible
    for (const card of discardPile)
        if (!visualDiscardPile.namedItem(card))
            discardPileDisplay.insertAdjacentHTML(
                'beforeend',
                `<span class="card" id="${card}">${card}</span>`
            );
}

function cleanZone(zone) {
    const deleteList = [];
    for (const cardNode of zone)
        if (!hand.includes(cardNode.id))
            deleteList.push(document.getElementById(cardNode.id));
    for (const cardEl of deleteList) cardEl.remove();
}
