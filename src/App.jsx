import React from 'react';
import { Route } from 'react-router-dom';

import { Header, HeroList, SelectedHero, AddNewHero } from './components';

import './app.css';

function App() {
  return (
    <div className="wrapper">
      <div className="gradient">
        <Header />

        <Route exact path="/" component={HeroList} />
        <Route exact path="/hero/:id" component={SelectedHero} />
        <Route exact path="/addHero" component={AddNewHero} />
      </div>
    </div>
  );
}

export default App;
