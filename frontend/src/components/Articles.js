import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class WrappedArticles extends Component {
  render() {
    return (
      this.props.events.map((el, i, arr) => {
        return (
          <article key={el._id}>
              some message
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
