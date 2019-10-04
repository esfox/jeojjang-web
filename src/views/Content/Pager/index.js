import React from 'react';
import './Pager.css';

import { getPage, changePage as goToPage } from '../../../services/urlService';

// `pages` is the number of pages of the media loaded from the backend
function Pager({ pages })
{
  if(!pages || pages === 1)
    return <div className="pager"></div>;

  // the page query parameter from the URL
  const page = parseInt(getPage());
  const canBack = page > 1;
  const canNext = page < pages;

  // function for handling changing pages
  const changePage = (next = true) =>
  {
    const toPage = page + (next?
      (canNext? 1 : page) :
      (canBack? -1 : page));
    goToPage(toPage);
  };

  return (
    <div className="pager">
      <button className={!canBack? "disabled" : ""}
        {...(!canBack? { disabled: true } : {})}
        onClick={() => changePage(false)}>
        <img src="back.svg" alt="back"/>
      </button>
      {page} / {pages}
      <button className={!canNext? "disabled" : ""}
        {...(!canNext? { disabled: true } : {})}
        onClick={() => changePage()}>
        <img src="forward.svg" alt="forward"/>
      </button>
    </div>
  );
}

export { Pager };
