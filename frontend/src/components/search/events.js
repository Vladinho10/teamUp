import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import InfiniteScroll from 'react-simple-infinite-scroll';
import Event from './Event';

class Users extends Component {
  state = {
    count: 100,
    join: true,
    searchData: [],
    isLoading: true,
    cursor: 0
  }

  // componentDidMount() {
  //   this.loadMore();
  // }

  // loadMore = () => {
  //   this.setState({ isLoading: true, error: undefined });
  //   fetch(`/api/search_results_loading/${this.props.location.search.slice(7)}?from=${this.state.cursor}`)
  //     .then(res => res.json())
  //     .then(
  //       (res) => {
  //         this.setState(state => ({
  //           items: [...state.items, ...res.items],
  //           cursor: res.cursor,
  //           isLoading: false
  //         }));
  //       },
  //       (error) => {
  //         this.setState({ isLoading: false, error });
  //       }
  //     );
  // }

  handleJoinEvent = (event) => {
    event.preventDefault();
  }

  handleUnjoinEvent = (event) => {
    event.preventDefault();
  }

  render() {
    const searchEventsResults = this.props.searchData.filter((item) => {
      return !!item.title;
    });

    const { filter = '' } = this.props;

    const typeFilteredArray = searchEventsResults.filter((event) => {
      return filter.slice(5) === 'all' ? true : event.type === filter.slice(5);
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
    // console.log(this.props.filter, 'this.props.filter');

    return (
      (this.props.filter ? filteredArray || [] : searchEventsResults).map((event) => {
        return (
          <React.Fragment>
            {/* <InfiniteScroll
              throttle={100}
              threshold={300}
              isLoading={this.state.isLoading}
              hasMore={!!this.state.cursor}
              onLoadMore={this.loadMore}
            > */}
            <Event
              event={event}
              join={this.state.join}
            />
            {/* </InfiniteScroll> */}

          </React.Fragment>

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
