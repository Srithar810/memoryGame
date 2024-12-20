const restartBtn = document.getElementById('restartBtn');
const gameBoard = document.getElementById('gameBoard');

let cards = [];
let flippedCards = [];
let matchedCards = [];
let totalPairs = 8; // Number of pairs to match

// Create the cards array with pairs of numbers
function generateCards() {
    let numbers = [];
    for (let i = 1; i <= totalPairs; i++) {
        numbers.push(i, i); // Add two cards for each pair
    }

    // Shuffle cards
    numbers = shuffle(numbers);

    // Create card elements
    cards = numbers.map(number => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = number;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        return card;
    });
}

// Shuffle function to randomize the card positions
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Flip the card and check for matches
function flipCard(event) {
    const clickedCard = event.target;

    // Do nothing if the card is already flipped or matched
    if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
        return;
    }

    // Flip the card
    clickedCard.classList.add('flipped');
    clickedCard.textContent = clickedCard.dataset.value;
    flippedCards.push(clickedCard);

    // Check if two cards have been flipped
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

// Check if the two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        // Cards match
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        // Cards don't match
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }

    flippedCards = [];
    checkGameOver();
}

// Check if all pairs have been matched
function checkGameOver() {
    if (matchedCards.length === cards.length) {
        setTimeout(() => {
            alert('You won! Restarting the game...');
            restartGame();
        }, 500);
    }
}

// Restart the game
function restartGame() {
    // Clear the game board
    gameBoard.innerHTML = '';

    // Reset variables
    flippedCards = [];
    matchedCards = [];

    // Generate new cards
    generateCards();
}

// Set up event listener for the restart button
restartBtn.addEventListener('click', restartGame);

// Initialize the game
generateCards();
