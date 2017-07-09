import "../../stylesheets/components/results.css";

import React, { Component } from "react";
import Movie from "./movie";

class Results extends Component {
  movies() {
    const { commonMedia, selectedPeople } = this.props;
    if (selectedPeople.length === 0) return this.noSelection();
    if (commonMedia.length > 0) {
      return this.movieResults();
    }
    return this.noResults();
  }

  movieResults() {
    const { commonMedia } = this.props;
    return commonMedia.map(cm => {
      return (
        <Movie
          key={`movie-card-${cm.id}`}
          imagePath={cm.poster_path}
          title={cm.title}
          id={cm.id}
          releaseDate={cm.release_date}
        />
      );
    });
  }

  noSelection() {
    return (
      <div className="Results-emptyState">
        <h2 className="Results-emptyStateHeader strong">
          Search for some people to see if they worked together on a movie.
        </h2>
        <h3 className="Results-emptyStateSubheader">
          (like <a href="./?aid=380,1032">De Niro and Scorsese</a>)
        </h3>
      </div>
    );
  }

  noResults() {
    return (
      <div className="Results-emptyState">
        <h2 className="Results-emptyStateHeader strong">:/</h2>
        <h2 className="Results-emptyStateHeader strong">
          Looks like these people haven't collabed yet.
        </h2>
      </div>
    );
  }

  render() {
    return (
      <div className="Results">
        <div className="Results-wrapper">
          {this.movies()}
        </div>
      </div>
    );
  }
}

export default Results;
