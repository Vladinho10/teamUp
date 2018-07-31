import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import getSearch from '../../actions/searchActions';

class Users extends Component {
  state = {
    count: 3
  }

  componentDidMount = () => {
    this.props.dispatch(getSearch(this.props.location.search.slice(7)));
  }

  render() {
    const tempArray = [];
    const searchUserResults = this.props.searchData.filter((item) => {
      return !!item.name;
    });

    for (let i = 0; i < searchUserResults.length; i += 1) {
      if (i < this.state.count) {
        tempArray.push(searchUserResults[i]);
      }
    }

    return (
      tempArray.map((item) => {
        return (
          <section key={ item._id } className="searched-users__user searched-user">
            <NavLink className="searched-user__link-image" to="/">
              <img className="searched-user__image" src={item.photo} alt="User Photo" />
            </NavLink>
            <div className="searched-user__user-info">
              <NavLink className="searched-user__user-name" to="/">
                <h3 className="searched-user__heading">{item.name}</h3>
              </NavLink>
            </div>
          </section>
        );
      })
    );
  }
}


const mapStateToProps = (state) => {
  // console.log(ownProps, 'searchresultspage ownprrops'); here i can find the query
  return {
    searchData: state.searchData
  };
};

export default withRouter(connect(mapStateToProps)(Users));
