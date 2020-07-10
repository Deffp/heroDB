import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import superherosAPI from '../../api/superherosAPI';

import { Button } from '../index';

import './SelectedHero.css';

function SelectedHero({
  match: {
    params: { id },
  },
}) {
  const history = useHistory();

  const [hero, setHero] = useState({});
  const [toggleEditHero, setToggleEditHero] = useState(false);

  function handleChange(event) {
    const value = event.target.value;
    setHero({
      ...hero,
      [event.target.name]: value,
    });
  }

  function handleChangeImg(event) {
    setHero({
      ...hero,
      image: URL.createObjectURL(event.target.files[0]),
    });
  }

  async function editHero() {
    setToggleEditHero(!toggleEditHero);
    const _editHero = await superherosAPI.editHero(hero);
    console.log(hero);
    return _editHero;
  }

  useEffect(() => {
    async function getSelectedHero() {
      const hero = await superherosAPI.getSelectedHero(id);

      setHero(hero);
    }

    getSelectedHero();
  }, [id]);

  return (
    <div className="wrapper-selected-hero">
      <div className="wrapper-hero-avatar">
        {toggleEditHero ? (
          <label className="filebutton">
            <input
              type="file"
              name="hero_avatar"
              id="myfile"
              onChange={(event) => handleChangeImg(event)}
              className="test"
            />
            <img alt="h ero-avatar" src={hero.image} />
          </label>
        ) : (
          <label className="filebutton">
            <input
              name="hero_avatar"
              id="myfile"
              onChange={(event) => handleChangeImg(event)}
              className="test"
            />
            <img alt="h ero-avatar" src={hero.image} />
          </label>
        )}
      </div>
      <div className="info-hero">
        <div className="info">
          <div className="top-info">
            <h1>{hero.nickname}</h1>
            <Button className="edit" onClick={() => editHero()}>
              Edit hero
            </Button>
          </div>

          {toggleEditHero ? (
            <div className="create-form">
              <label>Edit real name</label>
              <input type="text" name="real_name" value={hero.real_name} onChange={handleChange} />
              <label>Edit origin description</label>
              <input
                type="text"
                name="origin_description"
                value={hero.origin_description}
                onChange={handleChange}
              />
              <label>Edit superpowers</label>
              <input
                type="text"
                name="superpowers"
                value={hero.superpowers}
                onChange={handleChange}
              />
              <label>Edit catch phrase</label>
              <input
                type="text"
                name="catch_phrase"
                value={hero.catch_phrase}
                onChange={handleChange}
              />
            </div>
          ) : (
            <div>
              <p>{`Real name: ${hero.real_name}`}</p>
              <p>{`Origin description: ${hero.origin_description}`}</p>
              <p>{`Superpowers: ${hero.superpowers}`}</p>
              <p>{`Catch phrase: ${hero.catch_phrase}`}</p>
            </div>
          )}
        </div>
        <Button onClick={() => history.push('/')} className="back">
          Back
        </Button>
      </div>
    </div>
  );
}

export default SelectedHero;
