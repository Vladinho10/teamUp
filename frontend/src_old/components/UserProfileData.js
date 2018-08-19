import React, { Component } from 'react';
import Invite from './Invite';
import { NavLink } from 'react-router-dom';


export class UserProfileData extends Component {
  state = {
    switch_events:'admin'
  }
  transfer_to_sibling = (param) => {
    this.props.info_transfer(param);
    this.setState({
      switch_events:param
    });
  }
  
  componentDidMount = () => {
    fetch('/api/profile/' + this.props.id ,{
      credentials:'include',
      method:'GET'
    }).then((res)=>{return res.json()}).then((profile) => {
      this.setState({
        profile:profile
      });
    });
  }


  render() {
    return (
      <React.Fragment>
        <div className = 'profile'>
          <div className = 'profile_pic_frame'>
            <div className = 'profile_pic'>
              <img src={this.state.profile?this.state.profile.photo:''}   height='200' width='200'/>
            </div>
            <div className='profile_name'>
                {this.state.profile?this.state.profile.name:''}
            </div>
          </div>
          <div className = 'profile_name'>
            <div className = 'profile_name_txt'>
              <div>
                
              </div>
              {this.state.profile?this.state.profile.phone:''}
            </div>
            <Invite profile = {this.state.profile} id = {this.props.id} />
            <div className='profile_events_info'>
                <div className = {this.state.switch_events == 'admin'?'profile_events_switch':''} onClick = {() => {this.transfer_to_sibling('admin')}}> 
                  Created Events ({this.state.profile?this.state.profile.own_events.length:''})
                </div>
                <div className = {this.state.switch_events == 'user'?'profile_events_switch':''} onClick = {() => {this.transfer_to_sibling('user')}}>
                  Going Events ({this.state.profile?this.state.profile.attending_events.length:''})
                </div>
            </div>
          </div>
          
        </div>
      </React.Fragment>
    );
  }
}
