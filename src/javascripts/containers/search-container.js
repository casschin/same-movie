import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from "../redux/actions/search-actions";
import Search from "../components/search";

const mapStateToProps = state => {
  return {
    query: state.searchReducers.query,
    results: state.searchReducers.results,
    noResultsFound: state.searchReducers.noResultsFound,
    isFetchingResults: state.searchReducers.isFetchingResults,
    isSearching: state.searchReducers.isSearching,
    selectedPeople: state.searchReducers.selectedPeople,
    commonMedia: state.searchReducers.commonMedia,
    suggestions: state.searchReducers.suggestions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  };
};

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer;
