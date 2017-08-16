import "../../stylesheets/components/movie.css";
import moment from "moment";
import FontAwesome from "react-fontawesome";
import React from "react";
import TMDB from "../utils/tmdb";

const poster = (imagePath, title) => {
  if (imagePath) {
    return (
      <img
        className="Movie-image"
        src={TMDB.imageLink(imagePath, "large")}
        alt={`${title} movie poster`}
      />
    );
  }
  return (
    <div className="Movie-image Movie-imagePlaceholder">
      <FontAwesome name="film" className="Movie-imagePlaceholderIcon" />
    </div>
  );
};

const Movie = ({ imagePath, title, id, releaseDate }) => {
  return (
    <a
      className="Movie"
      href={TMDB.movieLink(id)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {poster(imagePath, title)}
      <h4 className="Movie-title strong">{title}</h4>
      <span className="Movie-releaseDate">
        ({releaseDate ? moment(releaseDate).format("YYYY") : "N/A"})
      </span>
    </a>
  );
};

export default Movie;
