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

  seeMore = (text) => {
    let temp;
    if (text.length > 143) {
      temp = `${text.slice(140)}...see more`;
    }
  }

  goToEventPage = (e) => {
    console.log(1666);
    if (!e.target.matches('.event-container__joinButton')) {
      this.props.history.push({
        pathname: '/events'
      });
    }
  };

  render() {
    const tempArray = [{
      title: 22,
      desc: `Here must be a description.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`
    }];
    // const { events } = this.props;
    return (
      tempArray.map((el, i, arr) => {
        return (
          <article key={el._id || i} a={this.props} onClick={this.goToEventPage} className='eventArticle'>
            <div className='event-photo'>
              <img className='event-photo__img' src='./images/domnjquery.jpg' alt='Event Photo' />
            </div>
            <div className='event-container'>
              <header className='event-container__header'>
                <h3>{el.title || 'Let\'s play contact'}</h3>
              </header>
              <div className='event-container__desc'>
                <p>{el.desc.length > 90 ? `${el.desc.slice(0, 90)}. . .` : el.desc}</p>
                <p className='event-container__desc-seeMore'>see more</p>
              </div>
              <div className='event-container__eventInfo'>
                <p>going {this.props.g}</p>
                <p>missing {this.props.m}</p>
                <div className='event-container__eventInfo-btn'>
                  <button onClick={this.changeBtnName} className='event-container__joinButton'>{this.state.buttonJoin ? 'Unjoin' : 'Join'}</button>                </div>
              </div>
              <footer className='event-container__footer'>
                <div className='event-container__footer-date'>
                  07.07.2007
                </div>
                <div className='event-container__footer-place'>
                  <LocationIcon role='icon' /> Al. Spandaryan 12
                </div>
              </footer>
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
