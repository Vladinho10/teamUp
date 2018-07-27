import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class SearchDropdown extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="search-dropdown__list">
          {this.props.searchData.map((item) => {
            return <li key={item._id} className="search-dropdown__item"><NavLink activeClassName="search-dropdown__link" to='/api/:id' >{item.title || item.type || item.name}</NavLink></li>;
          })}
        </ul>
        <p><NavLink to={`/search/all/:${this.props.query}`} >See all results for {this.props.query}</NavLink></p>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchData: state.searchData
  };
};

export default connect(mapStateToProps)(SearchDropdown);
