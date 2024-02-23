import React from 'react';
import Hand from './Hand';

const House = ({ cards }) => {
  return (
    <div>
      <h2>House's Hand:</h2>
      <Hand cards={cards} />
    </div>
  );
};

export default House;
