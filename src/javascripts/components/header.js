import '../../stylesheets/components/header.css';

import React from 'react';
import FontAwesome from 'react-fontawesome';

const Header = () => {
  return (
    <header className="Header">
      <a href="/" className="Header-link">
        <h1 className="Header-text">
          <FontAwesome name="video-camera" className="Header-icon"/>
          Same Movie
        </h1>
      </a>
    </header>
  );
};

export default Header;
