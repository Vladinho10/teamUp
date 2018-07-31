import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import User from './User';

class Users extends Component {
  state = {
    count: 3,
    join: true,
    searchData: [],
    isLoading: true,
    cursor: 0
  }

  componentDidMount() {
    this.loadMore();
    window.addEventListener('scroll', this.loadMore, false);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  loadMore = () => {
    const { innerHeight, scrollY } = window;

    if (document.body.offsetHeight < innerHeight + scrollY + 150) {
      const options = {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json ' }
      };
      fetch(`/api/search_results_load/users?keyword=${this.props.location.search.slice(7)}&from=${this.state.cursor}`, options)
        .then(res => res.json())
        .then(
          (res) => {
            console.log(res, 'reeeeeeeeeeeeeeeeeeeesssss  useeeeeeeersss');
            this.setState(state => ({
              searchData: [...state.searchData, ...res.users],
              cursor: +res.cursor,
              isLoading: false
            }));
          },
          (error) => {
            this.setState({ isLoading: false, error });
          }
        );
    }
  }

  render() {
    const { filter = '' } = this.props;
    const searchUsersResults = this.state.searchData;

    const userFilteredArray = searchUsersResults.filter((user) => {
      return filter.slice(5) === 'all';
    });

    const filteredArray = (userFilteredArray.length ? userFilteredArray : null);
    return (
      (this.props.filter ? filteredArray || [] : searchUsersResults).map((user) => {
        return (
          <User user={user} key={user._id} />
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
