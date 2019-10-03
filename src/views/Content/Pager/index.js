import React from 'react';
import './Pager.css';

function Pager({ pages, page, setPage })
{
  if(!pages || pages === 1)
    return <div className="pager"></div>;

  const canBack = page > 1;
  const canNext = page < pages;
  const changePage = (next = true) =>
  {
    window.scrollTo(0, 0);
    setPage(next? ++page : --page);
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
