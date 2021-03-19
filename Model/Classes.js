import { hand, discardPile } from '../script.js';

import { updateDeckSize, updateHand, updateDiscardPile } from './view.js';

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

export default class Deck {
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
