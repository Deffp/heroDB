import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import { Button } from '../index';

import './Header.css';

function Header() {
  const history = useHistory();
  return (
    <div className="header">
      <h1>
        <Link to="/?page=1">HeroDB</Link>
      </h1>
      <Button
        className="add"
        onClick={() => {
          history.push('/addHero');
        }}>
        Add new hero
      </Button>
    </div>
  );
}

export default Header;
