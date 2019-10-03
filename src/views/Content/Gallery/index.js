import React, { useState } from 'react';
import './Gallery.css';

import { Media } from './Media';
import { Lightbox } from './Lightbox';

/*
  `setData` is the function to set the data (to be used in
    the Tags component) to the media loaded
  `search` is the text typed in the search input */
function Gallery({ media, setSearch })
{
  // media to be shown in lightbox
  const [ clicked, setClicked ] = useState();

  return (
    <div className="gallery">
      <Lightbox media={clicked} setSearch={setSearch}/>
      {
        !media? null : media.map(media =>
        <Media key={`${media.id}-${media.link}`} media={media}
          setClicked={setClicked}/>)
      }
    </div>
  );
}

export { Gallery };
