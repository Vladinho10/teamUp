import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';


export class UserProfileData extends Component {
  state = {
    
  }
  componentDidMount = () =>{
    console.log(this.props.id);
    fetch('/api/profile/' + this.props.id ,{
      credentials:'include',
      method:'GET'
    }).then((res)=>{return res.json()}).then((profile) => {
      this.setState({
        profile:profile.user[0]
      });
    });
  }

  // componentDidMount = () => {
  //   const options = {
  //     credentials: 'include',
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json ' }
  //   };
  //   const f = fetch('/api/dashboard', options);
  //   f.then((res) => {
  //     return res.json();
  //   }).then((DataObj) => {
  //     this.setState({
  //       phoneNumber: DataObj.user.phone
  //     });
  //   }).catch(err => console.log(err));
  // }

  render() {
    if(this.state.profile){
      console.log(this.state.profile);
    }
    
    return (
      <React.Fragment>
        <div className = 'profile'>
          <div className = 'profile_pic'>
            <img src= {this.state.profile?this.state.profile.photo:''} alt="No photo....Sorry"/>
          </div>
          <div className = 'profile_name'>
            {this.state.profile?this.state.profile.name:''}
          </div>
          <div>
            {this.state.profile?this.state.profile.phone:''}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
