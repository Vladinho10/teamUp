import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
  <div className="not-found">
    <h1 className="not-found__heading">OOPS! - Could not find it</h1>
    <span className="not-found__404">404</span>
    <NavLink to="/" role="link" className="btn btn_black">Back</NavLink>
  </div>
);
