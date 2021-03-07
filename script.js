const deck = ['Card1', 'Card2', 'Card3', 'Card4', 'Card5'];
const hand = [];

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

function draw(arr) {
    hand.push(arr.pop());
    console.log(`Hand: ${hand.join(', ')}`);
    console.log(`${arr.length} cards left in deck`);
}
