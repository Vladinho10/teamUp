import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class EventLoginPage extends Component {
  // constructor(props) {
  //   super(props)
  // }
  render() {
    return (
      <React.Fragment>
        <header file={this.props} className='main-header'>
          <div className='main-header__logo'>
            Logo
          </div>
          <div className='main-header__welcome'>
            <h1>Welcome to teamUp !</h1>
          </div>
        </header>
        <main>
          <section className='description'>
            description section (this message must ne deleted)
            <h3>Join to us</h3>
            <p>Create your team or join existing ones, make your life more interesting</p>
          </section>
          <section>
            Sign in section (this message must ne deleted)
            <h3>Sign in with facebook</h3>
            <div>
              <NavLink role='link' to='/auth/facebook' activeClassName='is-active'>Sign in with facebook</NavLink>
            </div>
          </section>
        </main>
        <footer>

          <div className='copyright-div'>
            <p> &copy; teamUp 2018</p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default EventLoginPage;
