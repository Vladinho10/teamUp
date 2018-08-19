import React,{Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {UserProfileData} from './UserProfileData';
import AccountPageEventsFrame from './AccountPageEventsFrame';

import Loader from 'react-loader-spinner';

export class AccountPage extends Component {
    state = {
        switcher:'admin'
    }
    information_transfer = (param) =>{
        this.setState({
            switcher:param
        });
    }
    
    componentDidMount = () => { 
    }
    render(){
        return(
            <React.Fragment>
                <Header />
                <UserProfileData id={this.props.match.params.id} info_transfer = {this.information_transfer} />
                <AccountPageEventsFrame  id={this.props.match.params.id}  switcher = {this.state.switcher} history = {this.props.history} />
            </React.Fragment>
        );
    }
}