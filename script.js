import Deck from './Model/Classes.js';
import { formToTable, reset, returnToForm } from './Model/view.js';

// Model data
export let deck;
export const hand = [];
export const discardPile = [];

// set buttons
document.querySelector('.btn--draw').addEventListener('click', () => {
    deck.draw();
});
document.querySelector('.btn--reset').addEventListener('click', () => {
    reset();
});
document.querySelector('.btn--return').addEventListener('click', () => {
    returnToForm();
});

// Process form
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

    // Reverse visibility of form & play area, and update view
    formToTable();

    // Clear form
    form.reset();
};
