import React, { useState, useEffect } from 'react';
import './Content.css';

import { Header } from './Header';
import { Gallery } from './Gallery';
import { Pager } from './Pager';
import { Tags } from './Tags';

import { getMedia } from '../../services/apiService';
import { getTestMedia, getTestPages, searchTest, searchTestPages }
  from '../../test-data';

function Content()
{
  // search state
  const [ search, setSearch ] = useState();
  
  // array of media
  const [ media, setMedia ] = useState();

  // pagination
  const [ pages, setPages ] = useState();
  const [ page, setPage ] = useState(1);
  
  // Load pages and media at start
  useEffect(() =>
  {
    // Get media from service and load
    async function loadMedia()
    {
      // const fetchedMedia = await getMedia();
      // setMedia(fetchedMedia);

      const noSearch = !search || search === '';

      const pages = noSearch? getTestPages() : searchTestPages(search);
      setPages(pages);

      const data = noSearch? getTestMedia() : searchTest(search);
      setMedia(data);
    }
    
    loadMedia();
  }, [ search, setMedia ]);

  // Handle page changes
  useEffect(() =>
  {
    async function loadMedia()
    {
      const data = !search || search === ''? 
        getTestMedia(page) : searchTest(search, page);
      setMedia(data);
    }
    
    loadMedia();
  }, [ page, setMedia ]);

  return (
    <div>
      <Header search={search} setSearch={setSearch}/>
      <Gallery media={media} setSearch={setSearch}/>
      <Pager media={media} pages={pages} page={page} setPage={setPage}/>
      <Tags media={media} setSearch={setSearch}/>
    </div>
  );
}

export { Content };
