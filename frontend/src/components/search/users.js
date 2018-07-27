import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Users = (props) => {
  console.log(props, 'Users props');
  return (
    props.searchData.filter((item) => {
      return !!item.name;
    }).map((item) => {
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
};


const mapStateToProps = (state) => {
  // console.log(ownProps, 'searchresultspage ownprrops'); here i can find the query
  return {
    searchData: state.searchData
  };
};

export default connect(mapStateToProps)(Users);
