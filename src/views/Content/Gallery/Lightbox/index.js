import React, { useState, useRef, useEffect } from 'react';
import './Lightbox.css';

import { TagItems } from '../../Tags/TagItems';
import { getYouTubeID } from '../../Gallery/get-youtube-id';

function Lightbox({ media })
{
  const [ shown, setShown ] = useState(false);

  /** @type {{ current: HTMLElement }} */
  const content = useRef();

  // side-effect for checking for modal open and close
  // if `shown` is true, the media element is rendered and not if it's `false`
  useEffect(() =>
  {
    if(content.current)
    {
      const observer = new MutationObserver(mutations =>
      {
        // eslint-disable-next-line
        for(const { target } of mutations)
        {
          const isShown = target.className.includes('show');
          if(isShown)
            return setShown(isShown);

          setTimeout(() => setShown(isShown), 200);
        }
      });

      observer.observe(content.current,
        { attributes: true, attributeFilter: [ 'class' ] });
    }
  }, [ content ] );

  let id = media? media.id : '';
  let link = media? media.link : '';
  let tags = media? media.tags : [];
  let savedAt = media? media.savedAt : '';

  // default element (`img` for images)
  let element = <img className="media" src={link} alt="test lightbox"/>;

  // handle gfycat links
  if(link.includes('gfycat.com') && !link.includes('.gif'))
  {
    element = <video className="media" autoPlay loop preload="metadata"
      src={link}/>;

    // change the mp4 gfycat link to the original
    link = link.replace('giant.', '').replace('.mp4', '');
  }

  // handle mp4 video links
  else if(link.match(/\.mp4|\.webm/i))
    element = <video className="media" src={link} preload="metadata" controls/>;

  // handle youtube links
  else if(link.match(/youtube\.com|youtu\.be/g))
  {
    const youTubeID = getYouTubeID(link);
    element =
      <div className="media">
        <iframe title="youtube" frameBorder="0"
          src={`https://www.youtube.com/embed/${youTubeID}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      </div>;
  }
  
  return (
    <div className="modal fade lightbox" id="lightbox-modal" tabIndex="-1"
      role="dialog" aria-labelledby="lightbox modal" aria-hidden="true"
      ref={content}>
      <button type="button" className="close"
        data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            {shown? element : <></>}
            <div className="lightbox-info scrollable">
              <div className="lightbox-info-section text-truncate">
                Tags
              </div>
              <hr></hr>
              <div className="tags">
                <TagItems tags={tags}/>
              </div>
              <hr></hr>
              <div className="lightbox-info-section">
                Link <a className="text-truncate" rel="noopener noreferrer"
                  href={link} target="_blank">{link}</a>
              </div>
              <hr></hr>
              <div className="lightbox-info-section footer id">
                ID: {id}
              </div>
              <div className="lightbox-info-section footer saved-date">
                saved at {savedAt}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Lightbox };
