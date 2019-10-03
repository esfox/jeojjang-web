import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

import { getDiscordUserData } from '../../../services/apiService';

// const avatar = 'https://cdn.discordapp.com/avatars/247955535620472844'
//   + '/1c8b5af7fc1dc396420e7ce81d1ffd0f.png?size=2048';
// const username = 'esfox#2053';

// all common keys
const keys = `\`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./ `.split('');

// `search` is the text in the search bar
// `setSearch` is the function set the search (used in other components)
function Header({ search, setSearch })
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

    // set the search to the initial value of the search input
    setSearch(input.value);

    // set the search state when typing
    input.oninput = () =>
    {
      if(input.value.length === 0)
        setSearch();
    };

    // reset the search state when 'esc' is pressed
    input.onkeydown = ({ key }) =>
    {
      if(key === 'Escape')
        setSearch();
    };

    // focus search input when user types
    document.onkeydown = ({ key }) =>
    {
      if(keys.includes(key))
        input.focus();
    }
  }, [ setSearch ]);

  // side-effect for when the search state changes (when a tag is pressed)
  useEffect(() =>
  {
    if(!search)
      return;
      
    const input = searchInput.current;
    input.value = search;

    if(input !== document.activeElement)
      input.focus();
  }, [ search ]);

  return (
    <div className="header navbar navbar-expand sticky-top">
      <div className="user" ref={userInfo}>
        <img className="avatar" src={avatar} alt="User Avatar"></img>
        <h1 className="username">{username}</h1>
      </div>
      <div className="collapse navbar-collapse" ref={header}>
        <form className="form-inline" id="search"
          onSubmit={e =>
          {
            e.preventDefault();
            setSearch(searchInput.current.value);
          }}>
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
        {/* <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">Tags</a>
          </li>
        </ul> */}
      </div>
    </div>
  );
}

export { Header };
