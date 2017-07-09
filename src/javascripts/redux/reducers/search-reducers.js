import * as types from "../actions/search-actions";

const initialState = {
  query: "",
  results: [],
  suggestions: [],
  noResultsFound: false,
  isFetchingResults: false,
  isSearching: false,
  selectedPeople: [],
  commonMedia: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SELECTED_PEOPLE:
      return Object.assign({}, state, {
        selectedPeople: action.selectedPeople
      });
    case types.SELECT_PEOPLE:
      return Object.assign({}, state, {
        selectedPeople: action.people,
        commonMedia: action.commonMedia
      });
    case types.SHOW_SUGGESTIONS:
      return Object.assign({}, state, {
        suggestions: action.results
      });
    case types.START_SEARCH:
      return Object.assign({}, state, {
        isSearching: true
      });
    case types.REQUEST_SEARCH_RESULTS:
      return Object.assign({}, state, {
        query: action.query,
        noResultsFound: false,
        isFetchingResults: true
      });
    case types.RECEIVE_SEARCH_RESULTS:
      return Object.assign({}, state, {
        results: action.searchResults,
        isSearching: false,
        noResultsFound: action.searchResults.length === 0
      });
    case types.STOP_SEARCH:
      return Object.assign({}, state, {
        query: "",
        isSearching: false
      });
    default:
      return state;
  }
};

export default reducer;
