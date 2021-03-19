import { deck, hand, discardPile } from '../script.js';

// zone display elements
const deckDisplay = document.querySelector('.deck');
const handDisplay = document.querySelector('.hand');
const discardPileDisplay = document.querySelector('.discard');

// EXPORTED functions //

export function formToTable() {
    updateAllDisplays();
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('play-area').style.display = 'grid';
}

export function reset() {
    // Move all of hand and discard into deck
    deck.stack.push(...hand.splice(0));
    deck.stack.push(...discardPile.splice(0));
    // shuffle
    deck.shuffle();
    // view
    updateAllDisplays();
}

export function returnToForm() {
    // Reverse visibility of form & play area
    document.getElementById('play-area').style.display = 'none';
    document.getElementById('form-container').style.display = 'flex';

    // empty hand and discard pile arrays
    hand.splice(0);
    discardPile.splice(0);
}

export function updateAllDisplays() {
    updateDeckSize();
    updateHand();
    updateDiscardPile();
}

export function updateDeckSize() {
    deckDisplay.innerHTML = `Deck size: ${deck.stack.length}`;
}

export function updateHand() {
    // select all cards visible in hand
    const visualHand = document.querySelector('.hand').children;
    // remove all card no longer in hand array
    cleanZone(visualHand, hand);
    // add cards from hand array that are not yet visible in hand
    for (const card of hand)
        if (!visualHand.namedItem(card.id)) {
            handDisplay.insertAdjacentHTML(
                'beforeend',
                `<span class="card" id="${card.id}">${card.name}</span>`
            );
            document
                .getElementById(card.id)
                .addEventListener('click', () => card.discard());
        }
}

export function updateDiscardPile() {
    // select all cards visible in discard pile
    const visualDiscardPile = document.querySelector('.discard').children;
    // remove all cards no longer in discardPile array
    cleanZone(visualDiscardPile, discardPile);
    // add cards from discardPile array that are not yet visible in discard pile
    for (const card of discardPile)
        if (!visualDiscardPile.namedItem(card.id))
            discardPileDisplay.insertAdjacentHTML(
                'beforeend',
                `<span class="card" id="${card.id}">${card.name}</span>`
            );
}

// NON-EXPORTED functions //

function cleanZone(zone, array) {
    // create an array of cards visible in zone that are not in associated array
    const deleteList = [];
    for (const cardNode of zone)
        if (!array.includes(cardNode.id))
            deleteList.push(document.getElementById(cardNode.id));
    // remove all cards that are on the deleteList
    for (const cardEl of deleteList) cardEl.remove();
}
