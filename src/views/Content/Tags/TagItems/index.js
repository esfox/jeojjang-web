import React from 'react';
import './TagItems.css';

function TagItems({ tags, setSearch })
{
  if(!tags)
    return <></>;

  return tags.map(tag =>
    <div className="tag clickable"
      data-dismiss="modal" key={tag}
      onClick={({ target }) =>
      {
        setSearch('');
        setSearch(target.textContent);
      }}>
      {tag}
    </div>)
}

export { TagItems }
