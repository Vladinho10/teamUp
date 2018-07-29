import React,{Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {UserProfileData} from './UserProfileData';
import AccountPageEventsFrame from './AccountPageEventsFrame';
export class AccountPage extends Component {
    state = {
        switcher:'admin'
    }
    information_transfer = (param) =>{
        this.setState({
            switcher:param
        });
        console.log('hhhhh',this.state,'hhhhhh');
    }
    componentDidMount = () => {
        console.log(this.props.match.params.id,'svhhsvhsxvhjsvhj'); 
    }
    render(){
        console.log(this.state.switcher,'22222222222');
        return(
            <React.Fragment>
                <Header />
                <UserProfileData id={this.props.match.params.id} info_transfer = {this.information_transfer} />
                <AccountPageEventsFrame  id={this.props.match.params.id}  switcher = {this.state.switcher}/>
            </React.Fragment>
        );
    }
}