import React, { Component } from 'react';
import Invite from './Invite';
import { NavLink } from 'react-router-dom';


export class UserProfileData extends Component {
  state = {
    switch_events:'admin',
    image:''
  }
  transfer_to_sibling = (param) => {
    this.props.info_transfer(param);
    this.setState({
      switch_events:param
    });
  }
  
  componentDidMount = () => {
    console.log(this.props.id);
    fetch('/api/profile/' + this.props.id ,{
      credentials:'include',
      method:'GET'
    }).then((res)=>{return res.json()}).then((profile) => {
      console.log(profile,'jskbjkcbjcsbjksb');
      let image;
      console.log(profile.photo.slice(0,5));
      if(profile.photo.slice(0,5)=='https')
      {
        image = profile.photo;
      }
      else{
        image = 'data:image/png;base64,' + profile.photo;
      }
      this.setState({
        profile:profile,
        image:image
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
          <div className = 'profile_pic_frame'>
            <div className = 'profile_pic'>
              <img src={this.state.profile?this.state.image:''}   height='200' width='200'/>
            </div>
          </div>
          <div className = 'profile_name'>
            <div className = 'profile_name_txt'>
              {this.state.profile?this.state.profile.name:''}{ '  '} 
              {this.state.profile?this.state.profile.phone:''}
            </div>
            <div className='profile_events_info'>
              <Invite profile = {this.state.profile} id = {this.props.id} />
              <ul>
                <li className = {this.state.switch_events == 'admin'?'profile_events_switch':''} onClick = {() => {this.transfer_to_sibling('admin')}}> 
                  Created Events ({this.state.profile?this.state.profile.own_events.length:''})
                </li>
                <li className = {this.state.switch_events == 'user'?'profile_events_switch':''} onClick = {() => {this.transfer_to_sibling('user')}}>
                  Going Events ({this.state.profile?this.state.profile.attending_events.length:''})
                </li>
              </ul>
            </div>
          </div>
          
        </div>
      </React.Fragment>
    );
  }
}
