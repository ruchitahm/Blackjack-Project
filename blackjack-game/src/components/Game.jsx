import React, { useState, useEffect } from 'react';
import Player from './Player';
import House from './House';

const Game = () => {
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [houseCards, setHouseCards] = useState([]);
  const [gameResult, setGameResult] = useState('');
  const [roundEnded, setRoundEnded] = useState(false);

  useEffect(() => {
    // Initialize the deck
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => response.json())
      .then(data => {
        const deckId = data.deck_id;
        setDeckId(deckId);
        drawInitialCards(deckId);
      })
      .catch(error => {
        console.error('Error initializing the deck:', error);
      });
  }, []);

  const drawInitialCards = (deckId) => {
    drawCard(deckId, 1, setPlayerCards);
    drawCard(deckId, 1, setHouseCards);
  };

  const drawCard = (deckId, numCards, setCards) => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numCards}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setCards(cards => [...cards, ...data.cards]);
        } else {
          console.error('Error drawing cards:', data.error);
        }
      })
      .catch(error => {
        console.error('Error drawing cards:', error);
      });
  };

  const drawHouseCards = async () => {
    while (calculateHandTotal(houseCards) < 17) {
      await drawCard(deckId, 1, setHouseCards, true);
    }
    endRound();
  };

  const handleHit = () => {
    if (roundEnded || calculateHandTotal(playerCards) >= 21) {
      return;
    }

    drawCard(deckId, 1, setPlayerCards);
  };

  const handleStand = async () => {
    if (roundEnded) {
      return;
    }

    await drawHouseCards();
  };

  const determineWinner = () => {
    const playerTotal = calculateHandTotal(playerCards);
    const houseTotal = calculateHandTotal(houseCards);

    let result = '';

    if (playerTotal > 21) {
      result = 'House wins!';
    } else if (houseTotal > 21) {
      result = 'You win!';
    } else if (playerTotal === houseTotal) {
      result = 'It\'s a tie!';
    } else if (playerTotal > houseTotal) {
      result = 'You win!';
    } else {
      result = 'House wins.';
    }

    setGameResult(result);
  };

  const endRound = () => {
    setRoundEnded(true);
    determineWinner();
  };

  useEffect(() => {
    // if (roundEnded) {
    //   const playerTotal = calculateHandTotal(playerCards);
    //   const houseTotal = calculateHandTotal(houseCards);
    //   let result = '';

    //   if (playerTotal > 21) {
    //     result = 'House wins!';
    //   } else if (houseTotal > 21) {
    //     result = 'You win!';
    //   } else if (playerTotal === houseTotal) {
    //     result = 'It\'s a tie!';
    //   } else if (playerTotal > houseTotal) {
    //     result = 'You win!';
    //   } else {
    //     result = 'House wins.';
    //   }

    //   setGameResult(result);
    // }
    if (roundEnded) {
      determineWinner();
    }
  }, [playerCards, houseCards, roundEnded]);

  const calculateHandTotal = (cards) => {
    let total = 0;
    let numberOfAces = 0;

    cards.forEach(card => {
      if (card.value === 'ACE') {
        numberOfAces++;
      } else if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
        total += 10;
      } else {
        total += parseInt(card.value) || 10;
      }
    });

    while (numberOfAces > 0 && total + 11 <= 21) {
      total += 11;
      numberOfAces--;
    }

    while (numberOfAces > 0) {
      total += 1;
      numberOfAces--;
    }

    return total;
  };

  return (
    <div>
      <h1>Blackjack Game</h1>
      <Player cards={playerCards} onHit={handleHit} onStand={handleStand} roundEnded={roundEnded} />
      <House cards={houseCards} />
      {gameResult && <p>{gameResult}</p>}
      {roundEnded && (
  <div>
    <p>Round ended. Start a new round! </p>
  </div>
)}

    </div>
  );
};

export default Game;
