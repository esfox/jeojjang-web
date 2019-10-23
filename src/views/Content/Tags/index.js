import React, { useState, useEffect, useRef } from 'react';
import './Tags.css';

import { TagItems } from './TagItems';
import { getTags } from '../../../services/apiService';

// `media` is the media loaded from the backend
function Tags({ media })
{
  // `tags` is all the tags of the media loaded
  const [ tags, setTags ] = useState([]);
  const [ allTags, setAllTags ] = useState([]);

  /** @type {{ current: HTMLInputElement }} */
  const search = useRef();

  /** @type {{ current: HTMLInputElement }} */
  const modal = useRef();

  const loadTags = async () =>
  {
    let tags = await getTags();
    tags = tags
      .map(({ name }) => name)
      .sort((a, b) => a.localeCompare(b));

    setAllTags(tags);
    setTags(tags);
  }

  // side-effect for checking updates to the media loaded
  useEffect(() =>
  {
    loadTags();
  }, [ media ]);

  useEffect(() =>
  {
    search.current.oninput = ({ target: { value } }) =>
    {
      const filter = allTags.filter(tag => tag.includes(value));
      setTags(filter.length !== 0? filter : allTags);
    }
  }, [ allTags ]);

  return (
    <>
      <div className="tags-button" data-toggle="modal" data-target="#tags-modal">
        <img src="tags.svg" alt="tags icon"/>
      </div>
      <div className="modal fade" id="tags-modal" tabIndex="-1" role="dialog"
        ref={modal}>
        <div className="modal-dialog" role="document">
          <div className="modal-content tags">
            <div className="modal-header">
              <h5 className="modal-title">All Tags ({allTags.length})</h5>
              <input className="tags-search" type="search" ref={search}
                placeholder="Search tags..." autoFocus></input>
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
