import React from 'react';
import Hand from './Hand';

const Player = ({ cards, onHit, onStand, roundEnded }) => {
    return (
      <div>
        <h2>Your Hand:</h2>
        <Hand cards={cards} />
        <button onClick={onHit}disabled={roundEnded} >Hit</button>
        <button onClick={onStand} disabled={roundEnded}>Stand</button>
      </div>
    );
  };

export default Player;



  