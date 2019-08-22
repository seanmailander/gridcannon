const setupGrid = () => {
    const grid = document.getElementById('grid');
    [...Array(16)].forEach((element, i) => {
        const cardSpot = document.createElement('div');
        cardSpot.id = `spot${i}`;
        cardSpot.className = 'cardSpot'
        grid.appendChild(cardSpot);

    });
}

const showCard = (card) => {
    const currentCard = document.getElementById('currentCard');
    currentCard.innerText = card;
}

const JOKER = 0;

const CARDS = {
    ACE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
};

const SUITS = {
    HEARTS: 'h',
    DIAMONDS: 'd',
    CLUBS: 'c',
    SPADES: 's',
};

const shuffleDeck = () => {
    const deck = Object.keys(SUITS).map(suit => Object.keys(CARDS).map(card => ({
        suit: SUITS[suit],
        card: CARDS[card],
    }))).flat();

    const withJokers = [].concat(deck, { suit: '', card: JOKER }, { suit: '', card: JOKER });
    
    const ugglyShuffle = () => Math.random() > 0.5 ? -1 : 1;

    withJokers.sort(ugglyShuffle);
    withJokers.sort(ugglyShuffle);
    withJokers.sort(ugglyShuffle);
    withJokers.sort(ugglyShuffle);
    withJokers.sort(ugglyShuffle);
    withJokers.sort(ugglyShuffle);

    return withJokers;
}


const autorun = () => {
    setupGrid();

    showCard('A');

    const shuffledDeck = shuffleDeck();
    console.log(shuffledDeck);
}

(function(){
if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", autorun, false);
} else if (document.attachEvent) {
  document.attachEvent("onreadystatechange", autorun);
} else {
  window.onload = autorun;
}
})();