const TMDB = {
  imageLink(fileName, size) {
    const width = size === "large" ? "w185" : "w92";
    return `https://image.tmdb.org/t/p/${width}/${fileName}`;
  },

  movieLink(id) {
    return `https://www.themoviedb.org/movie/${id}`;
  }
};

export default TMDB;
