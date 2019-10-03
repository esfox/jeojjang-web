import React, { useRef } from 'react';
import './Media.css';

import { getYouTubeID } from '../get-youtube-id';

function Media({ media/* , filtered */, setClicked })
{
  let { link, /* tags */ } = media;

  /** @type {{ current: HTMLVideoElement }} */
  const video = useRef();
  
  // default element (`img` for images)
  let element = <img className="media" src={link} alt="media item"/>;

  // handle gfycat links
  if(link.includes('gfycat.com') && !link.includes('.gif'))
  {
    const [ , gfycatID ] = link.match(/gfycat\.com\/(.+?)(?=$|[^a-z])/i);
    element = 
      <>
        <img className="gif"
          src="https://miro.medium.com/max/2048/1*aKQW5LeudHfno2eopICRBQ.png"
          alt="gfycat icon"/>
        <video className="media" ref={video} loop preload="metadata"
          src={`https://thumbs.gfycat.com/${gfycatID}-mobile.mp4`}
          onMouseOver={({ target }) => target.play()}
          onMouseLeave={({ target }) => target.pause()}/>
      </>
  }

  // handle video links
  else if(link.match(/\.mp4|\.webm/i))
    element = <video className="media" src={link} controls preload="metadata"
      onClick={e => e.preventDefault()} controlsList="nofullscreen"/>;

  // handle youtube links
  else if(link.match(/youtube\.com|youtu\.be/g))
  {
    const youTubeID = getYouTubeID(link);
    
    // change element to YouTube thumbnail image
    element =
      <div className="youtube">
        <img className="youtube-icon" alt="youtube icon" src="youtube.svg"/>
        <img className="media" alt="media item"
          src={`https://i.ytimg.com/vi/${youTubeID}/hqdefault.jpg`}/>
      </div>;
  }

  return (
    <div className={"media-container"/*  + (filtered? " filtered" : "") */}
      title="Click to enlarge"
      onClick={() =>
      {
        if(video.current)
          video.current.pause();
        setClicked(media);
      }} data-toggle="modal" data-target="#lightbox-modal">
      {/* <div className="tags-container">
        <div>
          <span className="tags-label">Tags: </span>{tags.join(', ')}
        </div>
      </div> */}
      {element}
    </div>
  );
}

export { Media };
