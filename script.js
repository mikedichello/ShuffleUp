// ------------Classes----------
class Card {
    constructor(name, id) {
        this.name = name;
        this.id = name + id;
    }

    //method
    discard() {
        let index = hand.indexOf(this);
        hand.splice(index, 1);
        discardPile.push(this);
        updateHand();
        updateDiscardPile();
    }
}

class Deck {
    constructor(decklist) {
        this.decklist = decklist;
        this.stack = [];
    }

    createStack() {
        this.decklist.forEach(([num, cardName]) => {
            for (let i = 1; i <= num; i++) {
                const newCard = new Card(cardName, i);
                this.stack.push(newCard);
            }
        });
    }

    /* From: https://stackoverflow.com/a/12646864/14890950 */
    shuffle() {
        for (let i = this.stack.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.stack[i], this.stack[j]] = [this.stack[j], this.stack[i]];
        }
    }

    draw() {
        if (this.stack[0]) hand.push(this.stack.pop());
        updateDeckSize();
        updateHand();
    }
}

// ------------Initiation----------
let deck;

form.onsubmit = e => {
    e.preventDefault();

    // Parse input into decklist
    const decklistInput = document.getElementById('decklist-input').value;
    const decklistByLine = decklistInput.split('\n');
    const decklist = [];
    for (const line of decklistByLine)
        if (line) {
            const splitline = line.split(' ');
            decklist.push([splitline.shift(), splitline.join(' ')]);
        }

    // Create deck object & get it ready
    deck = new Deck(decklist);
    deck.createStack();
    deck.shuffle();

    // Reverse visibility of form & play area, update
    document.getElementById('form-container').style.display = 'none';
    updateDisplays();
    document.getElementById('play-area').style.display = 'grid';

    // Set button functions for play area
    document.querySelector('.btn--draw').addEventListener('click', () => {
        deck.draw();
    });
    document.querySelector('.btn--reset').addEventListener('click', () => {
        reset();
    });
};

const hand = [];
const discardPile = [];

const deckDisplay = document.querySelector('.deck');
const handDisplay = document.querySelector('.hand');
const discardPileDisplay = document.querySelector('.discard');

// ------------Controller----------

function reset() {
    deck.stack.push(...hand.splice(0));
    deck.stack.push(...discardPile.splice(0));
    deck.shuffle();
    updateDisplays();
}

// ------------View----------
function updateDisplays() {
    updateDeckSize();
    updateHand();
    updateDiscardPile();
}

function updateDeckSize() {
    deckDisplay.innerHTML = `Deck size: ${deck.stack.length}`;
}

function updateHand() {
    // select all of visible hand
    const visualHand = document.querySelector('.hand').children;
    // remove all card no longer in hand array
    cleanZone(visualHand);
    // add cards in hand array that are not yet visible
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

function updateDiscardPile() {
    // get all of visible discard pile
    const visualDiscardPile = document.querySelector('.discard').children;
    // remove all cards no longer in discardPile array
    cleanZone(visualDiscardPile);
    // add cards in discardPile array that are not yet visible
    for (const card of discardPile)
        if (!visualDiscardPile.namedItem(card.id))
            discardPileDisplay.insertAdjacentHTML(
                'beforeend',
                `<span class="card" id="${card.id}">${card.name}</span>`
            );
}

function cleanZone(zone) {
    const deleteList = [];
    for (const cardNode of zone)
        if (!hand.includes(cardNode.id))
            deleteList.push(document.getElementById(cardNode.id));
    for (const cardEl of deleteList) cardEl.remove();
}
