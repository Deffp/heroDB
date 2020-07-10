import axios from 'axios';

import { API_BASE_URL } from '../config';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

class superherosAPI {
  async getHeroList(page) {
    const response = await instance(`/superheros?page=${page}`);
    return { pageItem: response.data.pageOfItems, pager: response.data.pager };
  }
  async getSelectedHero(_id) {
    const response = await instance.post('/superheros', {
      _id,
    });
    return response.data.hero;
  }
  async addNewHero(hero) {
    const response = await instance.post('/add', {
      hero,
    });
    return response;
  }
  async deleteHero(_id) {
    const response = await instance.delete('/superheros', {
      data: {
        _id: _id,
      },
    });
    return response;
  }

  async editHero(hero) {
    const response = await instance.put('/superheros', {
      hero,
    });
    return response;
  }
}

export default new superherosAPI();
