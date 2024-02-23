import React from 'react';
import Card from './Card';

const Hand = ({ cards, player }) => {
  const calculateHandTotal = (cards) => {
    // Helper function to calculate the total value of a hand
    let total = 0;
    let numberOfAces = 0;

    cards.forEach((card) => {
      if (card.value === 'ACE') {
        numberOfAces++;
      } else if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
        total += 10;
      } else {
        total += parseInt(card.value);
      }
    });

    // Handle Aces to maximize the total without busting
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

  const totalPoints = calculateHandTotal(cards);

  return (
    <div>
      <h3>{player} Hand:</h3>
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
      <p>Total Points: {totalPoints}</p>
    </div>
  );
};

export default Hand;
