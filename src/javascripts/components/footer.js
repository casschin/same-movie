import "../../stylesheets/components/footer.css";

import React from "react";
import tmdbLogo from "../../images/tmdb.svg";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer-tmdbLogo">
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={tmdbLogo} alt="The Movie Database Logo" />
        </a>
      </div>
      <a
        className="Footer-itMe"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/casschin/same-movie"
      >
        Cass Chindustries 2017
      </a>
    </footer>
  );
};

export default Footer;
