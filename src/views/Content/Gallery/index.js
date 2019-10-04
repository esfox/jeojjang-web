import React, { useState } from 'react';
import './Gallery.css';

import { Media } from './Media';
import { Lightbox } from './Lightbox';

// `media` is the media loaded from the backend
function Gallery({ media })
{
  // media to be shown in lightbox
  const [ clicked, setClicked ] = useState();

  return (
    <div className="gallery">
      <Lightbox media={clicked}/>
      {
        !media? null : media.map(media =>
          <Media key={`${media.id}-${media.link}`} media={media}
            setClicked={setClicked}/>)
      }
    </div>
  );
}

export { Gallery };
