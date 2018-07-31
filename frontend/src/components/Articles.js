import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LocationIcon } from './SvgIcons';


class WrappedArticles extends Component {
  // state = {
  //   total: 5,
  //   currentCount: 2,
  //   offset: 2,
  //   list: [],
  //   isFetching: false
  // }
  //
  // componentWillMount() {
  //   this.loadInitialContent()
  // }
  //
  // componentWillReceiveProps() {
  //   console.log("propppppppppppppppp", this.props);
  //   this.loadInitialContent();
  // }
  //
  //
  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.loadOnScroll);
  // }
  state = {
    items: Array.from({ length: 3 }),
    hasMore: true
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollOnScroll);
  }

  handleScrollOnScroll = () => {

  }

  fetchMoreData = (ev) => {
    if (this.state.items.length >= ev.length) {
      this.setState({ hasMore: false });
      return;
    }
    const events = (
      this.props.events.sug
      || this.props.events.my
      || this.props.events.go
      || []
    );
    // a fake async api call like which sends
    // 20 more records in .5 secs
    switch (events) {
      case this.props.events.sug:
        ;
        break;
      default:

    }
  };


  render() {
    const events = (
      this.props.events.sug
      || this.props.events.my
      || this.props.events.go
      || []
    );
    // this.setState({
    //   items: events
    // });
    // console.log('events in Article', this.props);
    return (
      // this.state.list.map((el, i, arr) => (
      <div>

        <InfiniteScroll
          dataLength={this.state.items.length}
          next={() => this.fetchMoreData(events)}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          > vvvvvvvvvvvvvv
          {events.map((el, i, arr) => {
            return (
              <article key={el._id || i} onClick={e => this.goToEventPage(e, el._id)} className='eventArticle'>
                <div className='event-photo'>
                  <img className='event-photo__img' src={el.photo || './images/default.jpg'} alt='Event Photo' />
                </div>
                <div className='event-container'>
                  <header className='event-container__header'>
                    <h4>{el.title || 'Let\'s play contact'}</h4>
                  </header>
                  <div className='event-container__desc'>
                    <p>{el.description && el.description.length > 80 ? `${el.description.slice(0, 80)}. . .` : el.description}
                    </p>
                  </div>
                  <span className='event-container__desc-seeMore'>see more</span>
                  <span className='event-container__desc-seeMore'>{el.type}</span>
                  <div className='event-container__eventInfo'>
                    <p>going {el.players.length} </p>
                    <p>missing {el.quantity && el.quantity - el.players.length} </p>
                    <div className='event-container__eventInfo-btn'>
                      {false && <button onClick={ this.changeBtnName } className='event-container__joinButton'>Join</button>}
                    </div>
                  </div>
                  <footer className='event-container__footer'>
                    <div className='event-container__footer-date'>
                      {this.formatDate(el.date) || 'Date is not defined'}
                    </div>
                    <div className='event-container__footer-place'>
                      <LocationIcon role='icon' />
                      {el.location || 'location is not found'}
                    </div>
                  </footer>
                </div>
                <div>
                  <div className='event-type'>
                    {el.type}
                  </div>
                </div>
              </article>
            );
          })
          }
        </InfiniteScroll>
      </div>

    );
  }

  // forceLoadOnScroll() {
  //
  // }

  // loadOnScroll = (e) => {
  //   if (this.state.currentCount === this.state.total) return;
  //   const el = this.refs.contentEnd;
  //   console.log('vvvvvvvvvvvvvvvvvvvvvvvv', el);
  //   const rect = el.getBoundingClientRect();
  //   const isAtEnd = (
  //     // rect.top >= 0 &&
  //     // rect.left >= 0 &&
  //     rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  //     && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  //   );
  //   if (isAtEnd) {
  //     // User at the end of content. load more content
  //     if (!this.state.isFetching) {
  //       this.setState({ isFetching: true });
  //
  //       // get content from server
  //       setTimeout(() => {
  //         const fullList = (
  //           this.props.events.sug
  //           || this.props.events.my
  //           || this.props.events.go
  //           || []
  //         );
  //         const count = this.state.currentCount + this.state.offset;
  //         if (this.state.currentCount !== this.state.total) {
  //           this.setState({
  //             isFetching: false,
  //             currentCount: count,
  //             list: fullList.slice(0, count)
  //           });
  //         }
  //       }, 3000);
  //     }
  //   }
  // }
  //
  // loadInitialContent = () => {
  //   const fullList = (
  //     this.props.events.sug
  //     || this.props.events.my
  //     || this.props.events.go
  //     || []
  //   );
  //   // Get content from server using your preferred method (like AJAX, relay)
  //   const ary = fullList.slice(0, this.state.offset);
  //   this.setState({ list: ary });
  // }

  changeBtnName() {
    console.log(this.state);
  }

  formatDate = (stringDate) => {
    const options = {
      month: 'short',
      day: 'numeric',
    };
    return new Date(stringDate).toLocaleDateString([], options);
  };

  goToEventPage = (e, id) => {
    console.log(id);
    if (!e.target.matches('.event-container__joinButton')) {
      this.props.history.push({
        pathname: `/eventpage/${id}`
      });
    }
  };
}

const mapStateToProps = (state) => {
  return {
    states: state.a
  };
};

const Articles = connect(mapStateToProps)(WrappedArticles);
export default withRouter(Articles);
