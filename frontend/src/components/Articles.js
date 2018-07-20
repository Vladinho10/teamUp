import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { LocationIcon } from './SvgIcons';

class WrappedArticles extends Component {
  render() {
    const tempArray = [1];
    // const { events } = this.props;
    return (
      tempArray.map((el, i, arr) => {
        return (
          <article key={el._id} a={this.props}>
            <div className='event-photo'>event photo</div>
            <div className='event-container'>
              <div className='event-container__header'>
                <div className='event-container__header-type'>Football</div>
                <div className='event-container__header-title'>
                  <h4>Title</h4>
                </div>
              </div>
              <div className='event-container__about'>about</div>
              <div className='event-container__footer'>
                <div className='event-container__footer-date'>date</div>
                <div className='event-container__footer-place'>
                  <span>
                    <LocationIcon role='icon' />
                  </span>
                  <span>
                    Al. Spandaryan 12
                  </span>
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
export default Articles;
