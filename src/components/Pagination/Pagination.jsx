import React from 'react';
import { Link } from 'react-router-dom';

import './Pagination.css';

export default function Pagination({ pager }) {
  return (
    <div>
      <div className="card-footer pb-0 pt-3">
        {pager.pages && pager.pages.length > 0 && (
          <ul className="pagination">
            {pager.pages.map((page) => (
              <li
                key={page}
                className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                <Link to={{ search: `?page=${page}` }} className="page-link">
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
