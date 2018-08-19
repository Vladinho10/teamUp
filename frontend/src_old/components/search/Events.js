import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import Event from './Event';

class Events extends Component {
  state = {
    searchData: [],
    cursor: 0,
    length: 0
  }

  componentDidMount = () => {
    this.loadMore();
    window.addEventListener('scroll', this.loadMore);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.loadMore);
  }

  loadMore = () => {
    const { innerHeight, scrollY } = window;

    if (document.body.offsetHeight < innerHeight + scrollY + 150) {
      // console.log(this.state, 'stateeee');
      if (this.state.searchData.length === this.state.length) {
        window.removeEventListener('scroll', this.loadMore, false);
      }
      // console.log('fetch');
      fetch(`/api/search_results_load/events?keyword=${this.props.location.search.slice(7)}&from=${this.state.cursor}`, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json ' }
      }).then(res => res.json())
        .then((res) => {
          console.log(res, 'reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeesssssssssssssssssssssssss');
          // console.log(res.status, 'reeeeesss   statuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuus');
          this.setState(state => ({
            searchData: [...state.searchData, ...res.events],
            cursor: +res.cursor,
            length: +res.length,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleJoinEvent = (event) => {
    event.preventDefault();
  }

  handleUnjoinEvent = (event) => {
    event.preventDefault();
  }

  render() {
    const searchEventsResults = this.state.searchData.filter((item, i, ar) => { return ar.indexOf(item) === i; });
    console.log(searchEventsResults, 'searchEventsResults');

    const { filter = '' } = this.props;

    const typeFilteredArray = searchEventsResults.filter((event) => {
      console.log(event.type, 'type');
      return filter.slice(5) === 'all' ? true : event.type.toLowerCase() === filter.slice(5);
    });

    const dateFilteredArray = searchEventsResults.filter((event) => {
      switch (filter.slice(5)) {
        case 'any':
          return true;

        case 'today':
          return moment(event.date).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD');

        case 'tomorrow':
          return moment(event.date).format('YYYY-MM-DD') === moment(new Date()).add(1, 'days').format('YYYY-MM-DD');

        case 'week':
          return moment(event.date).isSame(new Date(), 'week');

        case 'month':
          return moment(event.date).isSame(new Date(), 'month');

        default:
          return false;
      }
    });

    const locationFilteredArray = searchEventsResults.filter((event) => {
      const result = event.location.toLowerCase().trim().match(new RegExp(`^${filter}`, 'g'));
      return (filter.slice(5) === 'anywhere' && true) || ((result && result.toString() !== '') && true);
    });

    const filteredArray = (typeFilteredArray.length ? typeFilteredArray : null)
      || (dateFilteredArray.length ? dateFilteredArray : null)
      || (locationFilteredArray.length ? locationFilteredArray : null);

    // console.log(locationFilteredArray, 'locationFilteredArray');
    // console.log(typeFilteredArray, 'typeFilteredArray');
    // console.log(dateFilteredArray, 'dateFilteredArray');
    // console.log(filteredArray, 'filteredArray');

    return (
      (this.props.filter ? filteredArray || [] : searchEventsResults).map((event) => {
        return (
          <Event
            key={event._id}
            event={event}
          />
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

export default withRouter(connect(mapStateToProps)(Events));
