import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class WrappedArticles extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { allArticles } = this.props;
    const articleItems = allArticles.map((el, i, arr) => {
      return (
        <article key={el._id}>
             some message
        </article>
      );
    });
    return (
      { articleItems }
    );
  }
}

const mapStateToProps = (state) => { // this.props.toDosArr
  return {
    allArticles: state.EventReducer
  };
};
const Articles = connect(mapStateToProps)(WrappedArticles);
export default Articles;
