import Api from "../../api";
import _ from "lodash";

export const REQUEST_SEARCH_RESULTS = "REQUEST_SEARCH_RESULTS";
export const requestSearchResults = query => {
  return { type: REQUEST_SEARCH_RESULTS, query };
};

export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";
export const receiveSearchResults = searchResults => {
  return { type: RECEIVE_SEARCH_RESULTS, searchResults };
};

export const START_SEARCH = "START_SEARCH";
export const startSearch = () => {
  return { type: START_SEARCH };
};

export const STOP_SEARCH = "STOP_SEARCH";
export const stopSearch = () => {
  return { type: STOP_SEARCH };
};

export const SHOW_SUGGESTIONS = "SHOW_SUGGESTIONS";
export const showSuggestions = results => {
  return { type: SHOW_SUGGESTIONS, results };
};

export const UPDATE_SELECTED_PEOPLE = "UPDATE_SELECTED_PEOPLE";
export const updateSelectedPeople = selectedPeople => {
  return { type: UPDATE_SELECTED_PEOPLE, selectedPeople };
};

export const SELECT_PEOPLE = "SELECT_PEOPLE";
export const selectPeople = (people, commonMedia) => {
  return { type: SELECT_PEOPLE, people, commonMedia };
};

// Removes people that are already selected and any duplicates
const removeDuplicates = (newList, existingList, iteratee) => {
  _.pullAllBy(newList, existingList, "id");
  return _.uniqBy(newList, iteratee);
};

// generates new array of common media
const filterCommonMedia = peopleList => {
  const commonMedia = peopleList.reduce((commonMediaList, person) => {
    if (commonMediaList.length) {
      const commonMediaIds = commonMediaList.map(cml => cml.id);
      return person.credits.filter(credit =>
        commonMediaIds.includes(credit.id)
      );
    } else return person.credits;
  }, []);

  // filter duplicate movies possible due to people being credited
  // as a cast and crew memeber
  let movieIds = [];
  return commonMedia.filter(movie => {
    if (!movieIds.includes(movie.id)) {
      movieIds = [...movieIds, movie.id];
      return true;
    } else return false;
  });
};

export const loadSuggestions = () => {
  return (dispatch, getState) => {
    Api.getPopularPeople().then(res =>
      dispatch(showSuggestions(res.data.results))
    );
  };
};

export const updateSuggestions = (movies, people) => {
  return dispatch => {
    const movieCredits = movies.map(movie => {
      return Api.getMovieDetails(movie.id).then(res => {
        return [
          ...res.data.credits.cast.slice(0, 5),
          ...res.data.credits.crew.slice(0, 1)
        ];
      });
    });
    return Promise.all(movieCredits)
      .then(credits => {
        const allCredits = credits.reduce(
          (acc, creditList) => [...acc, ...creditList],
          []
        );
        return removeDuplicates(allCredits, people, "id");
      })
      .then(credits => dispatch(showSuggestions(credits)));
  };
};

export const getPeople = ids => {
  return dispatch => {
    const person = ids.map(id => {
      return Api.getPerson(id).then(res => res.data);
    });
    Promise.all(person).then(p => p).then(people => {
      dispatch(updatePeople(people));
    });
  };
};

export const updatePeople = people => {
  return (dispatch, getState) => {
    if (!people.length) {
      dispatch(selectPeople([], []));
      dispatch(loadSuggestions());
    } else {
      const peopleWithDetails = people.map(person => {
        return Api.getPersonMovieCredits(person.id).then(res => {
          return { ...person, credits: [...res.data.cast, ...res.data.crew] };
        });
      });
      Promise.all(peopleWithDetails)
        .then(people => {
          const commonMedia = filterCommonMedia(people);
          dispatch(selectPeople(people, commonMedia));
          return { commonMedia, people };
        })
        .then(data => {
          const { commonMedia, people } = data;
          if (people.length > 1) {
            dispatch(updateSuggestions(commonMedia, people));
          } else {
            Api.peopleSearch(people[0].name).then(res => {
              const knownFor = res.data.results[0].known_for.filter(movie => {
                return movie.media_type === "movie";
              });
              dispatch(updateSuggestions(knownFor, people));
            });
          }
        });
    }
  };
};

export const removePerson = id => {
  return (dispatch, getState) => {
    const newPersonList = getState().searchReducers.selectedPeople.filter(
      person => person.id !== id
    );
    dispatch(updatePeople(newPersonList));
  };
};

export const addPeople = people => {
  return (dispatch, getState) => {
    dispatch(
      updatePeople([...getState().searchReducers.selectedPeople, ...people])
    );
  };
};

export const search = query => {
  return dispatch => {
    dispatch(requestSearchResults(query));
    Api.peopleSearch(query).then(res =>
      dispatch(receiveSearchResults(res.data.results))
    );
  };
};
