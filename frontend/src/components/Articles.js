import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LocationIcon } from './SvgIcons';

class WrappedArticles extends Component {
  state = {
    buttonJoin: false
  };

  changeBtnName = () => {
    this.setState(prevState => ({
      buttonJoin: !prevState.buttonJoin
    }));
  };

  goToEventPage = (e, id) => {
    console.log(id);
    if (!e.target.matches('.event-container__joinButton')) {
      this.props.history.push({
        pathname: `/eventpage/${id}`
      });
    }
  };

  render() {
    const tempArray = [1];
    // const { events } = this.props;
    return (
      tempArray.map((el, i, arr) => {
        return (
          <article key={el._id || i} a={this.props} onClick={e => this.goToEventPage(e, el._id)} className='eventArticle'>
            <div className='event-photo'>
              <img className='event-photo__img' src='./images/domnjquery.jpg' alt='Event Photo' />
            </div>
            <div className='event-container'>
              <div className='event-container__header'>
                <h3>Let's play contact</h3>
              </div>
              <div className='event-container__desc'>
                <p>Here must be a description.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
              </div>
              <div className='event-container__eventInfo'>
                <p>going {this.props.g}</p>
                <p>missing {this.props.m}</p>
                <button onClick={this.changeBtnName} className='btn event-container__joinButton'>{this.state.buttonJoin ? 'UnJoin' : 'Join'}</button>
              </div>
              <div className='event-container__footer'>
                <div className='event-container__footer-date'>
                  07.07.2007
                </div>
                <div className='event-container__footer-place'>
                  <LocationIcon role='icon' /> Al. Spandaryan 12
                </div>
              </div>
            </div>
          </article>
        );
      })
    );
  }
}

const mapStateToProps = (state) => { // this.props.toDosArr
  return {
    events: state.events
  };
};
const Articles = connect(mapStateToProps)(WrappedArticles);
export default withRouter(Articles);
