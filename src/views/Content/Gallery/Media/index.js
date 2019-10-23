import React, { useRef } from 'react';
import './Media.css';

import { getYouTubeID } from '../get-youtube-id';

function Media({ media, setClicked })
{
  let { link, /* tags */ } = media;

  /** @type {{ current: HTMLVideoElement }} */
  const video = useRef();
  
  // default element (`img` for images)
  let element = <img className="media" src={link} alt="unsupported format"/>;

  // handle gfycat links
  if(link.includes('gfycat.com') && !link.includes('.gif'))
  {
    const [ , gfycatID ] = link.match(/gfycat\.com\/(.+?)(?=$|[^a-z])/i);
    element = 
      <>
        <img className="gif"
          src="https://miro.medium.com/max/2048/1*aKQW5LeudHfno2eopICRBQ.png"
          alt="gfycat icon"/>
        <video className="media" ref={video} loop preload="metadata" muted
          src={`https://thumbs.gfycat.com/${gfycatID}-mobile.mp4`}
          onMouseOver={({ target }) => target.play()}
          onMouseLeave={({ target }) => target.pause()}/>
      </>
  }

  // handle video links
  else if(link.match(/\.mp4|\.webm|\.mov/i))
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
        <img className="media" alt="unsupported format"
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
      {element}
    </div>
  );
}

export { Media };
