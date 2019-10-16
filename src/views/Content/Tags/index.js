import React, { useState, useEffect } from 'react';
import './Tags.css';

import { TagItems } from './TagItems';
import { getTags, isPublic } from '../../../services/apiService';

// `media` is the media loaded from the backend
function Tags({ media })
{
  // `tags` is all the tags of the media loaded
  const [ tags, setTags ] = useState([]);

  const loadTags = async () =>
  {
    const tags = await getTags();
    setTags(tags
      .map(({ name }) => name)
      .sort((a, b) => a.localeCompare(b)));
  }

  // side-effect for checking updates to the media loaded
  useEffect(() =>
  {
    if(isPublic())
      loadTags();
    else
    {
      if(media)
        setTags(media
          .reduce((array, { tags }) => array.concat(tags), [])
          .filter((tag, i, tags) => tags.indexOf(tag) === i)
          .sort((a, b) => a.localeCompare(b)));
    }
  }, [ media ]);

  return (
    <>
      <div className="tags-button" data-toggle="modal" data-target="#tags-modal">
        <img src="tags.svg" alt="tags icon"/>
      </div>
      <div className="modal fade" id="tags-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content tags">
            <div className="modal-header">
              <h5 className="modal-title">All Tags ({tags.length})</h5>
              <button type="button" className="close"
                data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body scrollable">
              <TagItems tags={tags}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Tags };
