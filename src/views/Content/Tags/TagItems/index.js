import React from 'react';
import './TagItems.css';

import { searchTags } from '../../../../services/urlService';

// `tags` are the array of tags
function TagItems({ tags })
{
  if(!tags)
    return <></>;

  return tags.map(tag =>
    <div className="tag clickable"
      data-dismiss="modal" key={tag}
      onClick={({ target }) =>
      {
        searchTags(target.textContent);
      }}>
      {tag}
    </div>)
}

export { TagItems }
