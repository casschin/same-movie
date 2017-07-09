import "../../stylesheets/components/search.css";

import React, { Component } from "react";
import _ from "lodash";
import Person from "./person";
import TMDB from "../utils/tmdb";
import queryString from "query-string";

const SUGGESTIONS_LIMIT = 3;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      isSearching: false,
      showAllSuggested: false
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.clearSelected = this.clearSelected.bind(this);
    this.handleSearchQuery = _.debounce(
      this.handleSearchQuery.bind(this),
      1000
    );
  }

  componentDidMount() {
    const { searchActions } = this.props;
    const qs = queryString.parse(window.location.search);
    if (qs.aid) searchActions.getPeople(qs.aid.split(","));
    searchActions.loadSuggestions();
  }

  componentWillUpdate(nextProps) {
    const { selectedPeople } = nextProps;
    const searchQuery =
      selectedPeople.length === 0
        ? "/"
        : `?aid=${selectedPeople.map(sp => sp.id).join(",")}`;
    window.history.replaceState(null, null, searchQuery);
  }

  updateQuery(event) {
    const { searchActions } = this.props;
    const query = event.target.value;
    searchActions.startSearch();
    this.setState({ query });
    if (query.length > 0) {
      this.handleSearchQuery(query);
    } else {
      searchActions.stopSearch();
      searchActions.loadSuggestions();
    }
  }

  handleSearchQuery(query) {
    const { searchActions } = this.props;
    searchActions.search(query);
  }

  clearSearch() {
    this.setState({ query: "" });
  }

  add(person) {
    const { searchActions } = this.props;
    return {
      type: "add",
      action: () => {
        this.clearSearch();
        this.setState({ showAllSuggested: false });
        searchActions.addPeople([person]);
      }
    };
  }

  results(showAll = false) {
    const { query } = this.state;
    const { isSearching, results, suggestions } = this.props;
    if (query.length > 0) {
      if (isSearching) {
        return <div className="Search-searching">searching...</div>;
      }
      if (!results.length && query !== "")
        return <div className="Search-searching">nothing found :(</div>;
      return this.peopleList(results);
    }
    return this.peopleList(
      showAll ? suggestions : suggestions.slice(0, SUGGESTIONS_LIMIT)
    );
  }

  peopleList(people) {
    return people.map(r => {
      return (
        <Person
          key={`search-result-${r.id}`}
          name={r.name}
          image={r.profile_path ? TMDB.imageLink(r.profile_path) : null}
          handleClick={this.add(r)}
        />
      );
    });
  }

  remove(id) {
    const { searchActions } = this.props;
    return {
      type: "remove",
      action: () => {
        this.clearSearch();
        this.setState({ showAllSuggested: false });
        searchActions.removePerson(id);
      }
    };
  }

  clearSelected() {
    const { searchActions } = this.props;
    searchActions.updatePeople([]);
  }

  selected() {
    const { selectedPeople } = this.props;
    if (!selectedPeople.length) return null;
    return selectedPeople.map(r => {
      return (
        <Person
          key={`search-result-${r.id}`}
          name={r.name}
          image={TMDB.imageLink(r.profile_path)}
          handleClick={this.remove(r.id)}
        />
      );
    });
  }

  selectedList() {
    const { selectedPeople } = this.props;
    if (!selectedPeople.length) return null;
    return (
      <div className="Search-selected Search-section">
        <div className="Search-sectionHeaderContainer">
          <h3 className="Search-sectionHeader strong">Selected People:</h3>
          {selectedPeople.length > 0 &&
            <span className="Search-clearAll" onClick={this.clearSelected}>
              (clear all)
            </span>}
        </div>
        {this.selected()}
      </div>
    );
  }

  suggestedList() {
    const { query, showAllSuggested } = this.state;
    const { suggestions } = this.props;
    const isSearch = query.length > 0;
    if (suggestions.length === 0) return null;
    const label = isSearch ? "Search results:" : "Suggested people";
    return (
      <div className="Search-results Search-section">
        <h3 className="Search-sectionHeader strong">
          {label}
        </h3>
        {this.results(showAllSuggested)}
        {!showAllSuggested &&
          suggestions.length > SUGGESTIONS_LIMIT &&
          !isSearch &&
          <div
            className="Search-showMore"
            onClick={() => this.setState({ showAllSuggested: true })}
          >
            Show more
          </div>}
      </div>
    );
  }

  render() {
    const { query } = this.state;
    return (
      <div className="Search">
        <div className="Search-inputWrapper">
          <input
            className="Search-input"
            value={query}
            onChange={this.updateQuery}
            placeholder="Search for someone..."
          />
        </div>
        <div className="Search-container">
          {this.selectedList()}
          {this.suggestedList()}
        </div>
      </div>
    );
  }
}

export default Search;
