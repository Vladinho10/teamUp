import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

class SearchDropdown extends Component {
  state = {
    count: 8
  }

  render() {
    const tempArray = [];

    for (let i = 0; i < this.props.searchData.length; i += 1) {
      if (i < this.state.count) {
        tempArray.push(this.props.searchData[i]);
      }
    }
    return (
      <React.Fragment>
        <ul className="search-dropdown__list">
          {tempArray.map((item) => {
            return <li key={item._id} className="search-dropdown__item">
              <NavLink activeClassName="search-dropdown__link" to={item.name ? `/account/${item._id}` : `/eventpage/${item._id}`}>{item.title || item.type || item.name}</NavLink>
            </li>;
          })}
        </ul>
        <p><NavLink to={`/search/all/?query=${this.props.query}`} >See all results for {this.props.query}</NavLink></p>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchData: state.searchData
  };
};

export default withRouter(
  connect(mapStateToProps)(SearchDropdown)
);
