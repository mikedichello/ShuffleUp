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

};


class Deck {
  constructor(decklist){
    this.decklist = decklist;
    this.stack = [];
  }

  createDeck() {
    this.decklist.forEach(([num, cardName]) => {
      console.log(num, cardName);
      for(let i = 1; i <= num; i++ ){
        const newCard = new Card(cardName, i);
        console.log(newCard);
        this.stack.push(newCard);
      }
    });
  }

  shuffleDeck() {
      for (let i = this.stack.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.stack[i], this.stack[j]] = [this.stack[j], this.stack[i]];
      }
  }
}


let decklist = [
  [4, "Bolt"],
  [4, "path"],
  [3, "bob"],
  [2, "steve"],
  [16, "land"]
];

const deck = new Deck(decklist);

deck.createDeck();

console.log(deck);

deck.shuffleDeck();

console.log(deck.stack);