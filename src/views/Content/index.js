import React, { useState, useEffect } from 'react';
import './Content.css';

import { Header } from './Header';
import { Gallery } from './Gallery';
import { Pager } from './Pager';
import { Tags } from './Tags';

import { getMedia, getMediaPages } from '../../services/apiService';
import { getTagsSearch, getPage } from '../../services/urlService';

function Content()
{
  // array of media
  const [ media, setMedia ] = useState();

  // pagination
  const [ pages, setPages ] = useState();

  // Get media from service and load
  const loadMedia = async () =>
  {
    const tags = getTagsSearch();
    const page = getPage();

    const pages = await getMediaPages(tags);
    setPages(pages);
    
    const media = await getMedia(page, tags);
    setMedia(media);
  }
  
  // Load pages and media at start
  useEffect(() =>
  {
    loadMedia();
  }, [ setMedia ]);

  return (
    <div>
      <Header/>
      <Gallery media={media}/>
      <Pager media={media} pages={pages}/>
      <Tags media={media}/>
    </div>
  );
}

export { Content };
