const setupGrid = () => {
    const grid = document.getElementById('grid');
    [...Array(25)].forEach((element, i) => {
        const cardSpot = document.createElement('div');
        cardSpot.id = `spot${i}`;
        cardSpot.className = 'cardSpot'
        grid.appendChild(cardSpot);

    });
}

const showCard = ({ suit, card }) => {
    const currentCard = document.getElementById('currentCard');
    currentCard.innerText = `${card}${suit}`;
}

const placeCardInGrid = ({ suit, card }, targetedSpot) => {
    const spot = document.getElementById(`spot${targetedSpot}`);
    spot.innerText = `${card}${suit}`;
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

const isRoyalty = ({ card }) => card >= 11;

const targetSpots = [6,7,8,11,12,13,16,17,18]

const dealGrid = (shuffledDeck) => {
    let placedCards = 0;
    const skippedRoyalty = [];
    // Place grid one-by-one
    while (placedCards < 9) {
        const currentCard = shuffledDeck.splice(0, 1)[0];
        if (isRoyalty(currentCard)) {
            // Place aside
            skippedRoyalty.push(currentCard);
        } else {
            // Place in grid
            //TODO: get legal move
            const targetedSpot = targetSpots[placedCards];
            placeCardInGrid(currentCard, targetedSpot);
            placedCards++;
        }
    }

    // Place royalty
    while (skippedRoyalty.length > 0) {
        const currentCard = skippedRoyalty.splice(0, 1)[0];
        // Place in grid
        //TODO: get legal move
        const targetedSpot = skippedRoyalty.length;
        placeCardInGrid(currentCard, targetedSpot);
    }

    return shuffledDeck;
}


const autorun = () => {
    setupGrid();

    const shuffledDeck = shuffleDeck();


    const remainingDeck = dealGrid(shuffledDeck);

    showCard(remainingDeck[0]);
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