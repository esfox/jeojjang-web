import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

import { getDiscordUserData } from '../../../services/apiService';
import { getTagsSearch, searchTags } from '../../../services/urlService';

// all common keys
const keys = `\`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./ `.split('');

function Header()
{
  /** @type {{ current: HTMLElement }} */
  const userInfo = useRef();

  /** @type {{ current: HTMLElement }} */
  const header = useRef();
  
  // states for the username and avatar
  const [ username, setUsername ] = useState();
  const [ avatar, setAvatar ] = useState();
  
  // load the user's username and avatar
  const loadUser = async () =>
  {
    const user = await getDiscordUserData();

    // if there's no user, change the header's appearance
    if(!user)
    {
      userInfo.current.style = 'display: none;';
      header.current.className += ' justify-content-center';
      return;
    }

    const { tag, avatarURL } = user;
    setUsername(tag);
    setAvatar(avatarURL);
  }

  // Load Discord usernamd and avatar on start
  useEffect(() =>
  {
    loadUser();
  }, []);

  /** @type {{ current: HTMLInputElement }} */
  const searchInput = useRef();

  // initial side-effect for the search input
  useEffect(() =>
  {
    const input = searchInput.current;
    input.value = getTagsSearch();

    // focus search input when user types
    document.onkeydown = ({ key }) =>
    {
      if(keys.includes(key))
        input.focus();
    }
  }, []);

  // function to handle the onsubmit of the search bar
  const onSubmit = e =>
  {
    e.preventDefault();
    const tags = e.target.firstChild.firstChild.value;
    searchTags(tags);
  };

  return (
    <div className="header navbar navbar-expand sticky-top">
      <div className="user" ref={userInfo}>
        <img className="avatar" src={avatar} alt="User Avatar"></img>
        <h1 className="username">{username}</h1>
      </div>
      <div className="collapse navbar-collapse" ref={header}>
        <form className="form-inline" id="search" onSubmit={onSubmit}>
          <div className="input-group">
            <input className="search-input form-control"
              type="search" aria-label="Search"
              placeholder="Search by tag/s..." spellCheck="false"
              ref={searchInput}></input>
            <button className="btn search-icon" form="search">
              <img src="search.svg" alt="search icon"/>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { Header };
