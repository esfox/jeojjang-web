import React, { useState, useEffect } from 'react';
import './Content.css';

import { Header } from './Header';
import { Gallery } from './Gallery';
import { Pager } from './Pager';
import { Tags } from './Tags';

// import { getMedia } from '../../services/apiService';
import { getTagsSearch, getPage } from '../../services/urlService';
import { getTestMedia, getTestPages, searchTest, searchTestPages }
  from '../../test-data';

function Content()
{
  // array of media
  const [ media, setMedia ] = useState();

  // pagination
  const [ pages, setPages ] = useState();

  // Get media from service and load
  const loadMedia = async () =>
  {
    // const fetchedMedia = await getMedia();
    // setMedia(fetchedMedia);

    const tags = getTagsSearch();
    const page = getPage();
    const noSearch = !tags || tags === '';

    const pages = noSearch? getTestPages() : searchTestPages(tags);
    setPages(pages);

    const data = noSearch? getTestMedia(page) : searchTest(tags, page);
    setMedia(data);
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
