import React from 'react';

import superherosAPI from '../api/superherosAPI';

import { Button } from './index';

function DeleteHero({ _id, removeHero }) {
  const deleteHero = async (_id) => {
    const removedHero = await superherosAPI.deleteHero(_id);
    removeHero(_id);
    return removedHero;
  };

  return (
    <Button onClick={() => deleteHero(_id)} className="remove-hero">
      <span>Delete hero</span>
    </Button>
  );
}

export default DeleteHero;
