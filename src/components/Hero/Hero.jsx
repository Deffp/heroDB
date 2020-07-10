import React from 'react';
import { useHistory } from 'react-router-dom';

import { DeleteHero } from '../index';

import './Hero.css';

function Hero({ hero: { nickname, _id, image }, removeHero }) {
  const history = useHistory();

  return (
    <div className="wrraper">
      <DeleteHero _id={_id} removeHero={removeHero} />

      <div className="hero" onClick={() => history.push(`hero/${_id}`)}>
        <img alt="hero-avatar" src={image} />
        <p>{nickname}</p>
      </div>
    </div>
  );
}

export default Hero;
