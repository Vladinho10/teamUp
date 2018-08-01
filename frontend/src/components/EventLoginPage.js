import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const logo = require('../../dist/images/logo.png');

class EventLoginPage extends Component {
  render() {
    return (
      <React.Fragment>
        <header file={this.props} className='login-header'>
          <div className="row">
            <div className="login-header__wrapper">
              <div className='login-header__logo-box'>
                <NavLink to="/" role="link"><img src={logo} alt="logo" width="190" height="80" className="navbar__logo" role="logo" /></NavLink>
              </div>
              <h1 className="login-header__heading">Welcome to teamUp !</h1>
            </div>
          </div>
        </header>
        <main>
          <section className="register">
            <div className="row">
              <div className="register-wrapper">
                <section className='register__description'>
                  <h2>Say hello to TeamUp - The best place to plan and implement your events</h2>
                  <p>
                    Create your team or join existing ones, make your life more interesting.
                    Create different kind of events , invite your frineds and have a fun.
                  </p>
                </section>
                <section className="register__sign-in">
                  <h2>Sign in with facebook</h2>
                  <div>
                    <a role='link' href='/auth/facebook' className="btn btn_green btn_animated btn_active">Sign in with facebook</a>
                  </div>
                </section>
              </div>
            </div>
          </section>

        </main>
        <footer className="main-footer">
          <div className="row">
            <p className="copyright"> &copy; teamUp 2018: <small>All rights reserved</small></p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default EventLoginPage;
