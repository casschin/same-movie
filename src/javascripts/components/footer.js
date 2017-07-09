import '../../stylesheets/components/footer.css';

import React from 'react';
import tmdbLogo from '../../images/tmdb.svg';

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer-tmdbLogo">
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
          <img src={tmdbLogo} alt="The Movie Database Logo" />
        </a>
      </div>
      <span className="Footer-itMe">Cass Chindusties 2017</span>
    </footer>
  );
};

export default Footer;
