import axios from 'axios';
import { TMDB_KEY, TMDB_BASEURL } from './config.js';

axios.defaults.baseURL = TMDB_BASEURL;

const get = (url, params = null) => {
  return axios.get(url, {
    params: { ...params, api_key: TMDB_KEY }
  });
};

const Api = {
  config() {
    return get('/configuration');
  },

  peopleSearch(query) {
    return get('/search/person', { query: query });
  },

  getPersonCredits(id) {
    return get(`/person/${id}/combined_credits`);
  },

  getPersonMovieCredits(id) {
    return get(`/person/${id}/movie_credits`);
  },

  getPerson(id) {
    return get(`/person/${id}`, { append_to_response: 'combined_credits' });
  },

  getPopularPeople() {
    return get(`/person/popular`);
  },

  getMovieDetails(movieId) {
    return get(`/movie/${movieId}`, { append_to_response: 'credits' });
  },

  getDiscover(actorIds) {
    const actorIdsString = actorIds.join(',');
    return get(`discover/movie`, { with_people: actorIdsString })
  }
};

export default Api
