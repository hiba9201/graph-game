import React from 'react';

import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Graph Game</h1>
        <ul className="header__links">
          <li className="header__link-item">
            <span className="header__link-icon fa fa-github" aria-hidden="true" />
            <a className="header__link" target="_blank" rel="noopener noreferrer"
               href="https://github.com/hiba9201/graph-game">GitHub</a>
          </li>
          <li className="header__link-item">
            <span className="header__link-icon fa fa-telegram" aria-hidden="true" />
            <a className="header__link" target="_blank" rel="noopener noreferrer"
               href="https://t.me/jerry_raccoon">Telegram</a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;