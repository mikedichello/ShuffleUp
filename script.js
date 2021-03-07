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
const deckDisplay = document.querySelector('.deck');
const handDisplay = document.querySelector('.hand');

window.onload = () => {
    shuffleArray(deck);
    updateDisplays();
    document.querySelector('.btn--draw').addEventListener('click', () => {
        draw();
    });
};

/* Randomize array in-place using Durstenfeld shuffle algorithm
https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function draw() {
    if (deck[0]) hand.push(deck.pop());
    updateDisplays();
}

function updateDisplays() {
    deckDisplay.innerHTML = `Deck size: ${deck.length}`;
    handDisplay.innerHTML = `Hand: ${hand[0] ? hand.join(', ') : 'Empty'}`;
}
