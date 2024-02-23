import React from 'react';

const Card = ({ card }) => {
  return (
    <div className="card">
      <img src={card.image} alt={card.code} />
    </div>
  );
};

export default Card;
