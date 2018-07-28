import React,{Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {UserProfileData} from './UserProfileData';
import AccountPageEventsFrame from './AccountPageEventsFrame';
export class AccountPage extends Component {
    state = {

    }
    componentDidMount = () => {
        console.log(this.props.match.params.id,'svhhsvhsxvhjsvhj'); 
    }
    render(){
        return(
            <React.Fragment>
                <Header />
                <UserProfileData id={this.props.match.params.id} />
                <AccountPageEventsFrame id={this.props.match.params.id}/>
            </React.Fragment>
        );
    }
}