import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as searchActions from "../redux/actions/search-actions";
import Results from "../components/results";

const mapStateToProps = state => {
  return {
    commonMedia: state.searchReducers.commonMedia,
    selectedPeople: state.searchReducers.selectedPeople
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  };
};

const ResultsContainer = connect(mapStateToProps, mapDispatchToProps)(Results);

export default ResultsContainer;
