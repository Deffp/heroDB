import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import superherosAPI from '../../api/superherosAPI';

import { Button } from '../index';

import './AddNewHero.css';

function AddNewHero() {
  const history = useHistory();

  const [hero, setHero] = useState({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
    image: null,
  });

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

  const addHero = async () => {
    const addHero = superherosAPI.addNewHero(hero);
    history.push('/');
    return addHero;
  };

  return (
    <div>
      <div className="wrapper-new-hero">
        <div className="left-bar">
          <label className="filebutton">
            <input
              type="file"
              name="hero_avatar"
              id="myfile"
              onChange={(event) => handleChangeImg(event)}
            />
            <img alt="Add hero avatar" src={hero.image} />
          </label>
        </div>
        <div className="right-bar">
          <div className="create-form">
            <label>Nickname</label>
            <input type="text" name="nickname" value={hero.nickname} onChange={handleChange} />
            <label>Real name</label>
            <input type="text" name="real_name" value={hero.real_name} onChange={handleChange} />
            <label>Origin description</label>
            <input type="text" name="origin_description" onChange={handleChange} />
            <label>Superpowers</label>
            <input type="text" name="superpowers" onChange={handleChange} />
            <label>Catch phrase</label>
            <input type="text" name="catch_phrase" onChange={handleChange} />
            <div className="btn-group">
              <Button onClick={() => addHero()} className="add-hero">
                Add hero
              </Button>
              <Button onClick={() => history.push('/')} className="cancel">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewHero;
