import React, { useState, useEffect } from 'react';

import superherosAPI from '../../api/superherosAPI';

import { Hero, Pagination } from '../index';

import './HeroList.css';

function HeroList(props) {
  const [response, setResponse] = useState(null);
  const [pager, setPager] = useState({});
  const [pageOfItems, setPageOfItems] = useState([]);

  useEffect(() => {
    const {
      location: { search },
    } = props;

    const params = new URLSearchParams(search);
    const page = parseInt(params.get('page')) || 1;

    async function loadPage() {
      const response = await superherosAPI.getHeroList(page);
      setResponse(response.pageItem);
      setPager(response.pager);
      setPageOfItems(pageOfItems);
    }
    addUpdateList(page);

    loadPage();
  }, [props, pageOfItems]);

  const removeHero = async (_id) => {
    const list = response.filter((hero) => hero._id !== _id);
    setResponse(list);
  };

  async function addUpdateList(page) {
    const response = await superherosAPI.getHeroList(page);
    setResponse(response.pageItem);
  }

  return (
    <div className="wrapper-hero-list">
      <div className="hero-list">
        {response &&
          response.map((hero, index) => (
            <Hero key={`${hero}_${index}`} hero={hero} removeHero={removeHero} />
          ))}
      </div>
      <div className="pagination">
        <Pagination pager={pager} pageOfItems={pageOfItems} />
      </div>
    </div>
  );
}

export default HeroList;
