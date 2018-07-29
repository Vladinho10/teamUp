import React,{Component} from 'react';
import AccountPageEvents from './AccountPageEvents';
export default class AccountPageEventsFrame extends Component{
    render(){
        return(
            <div className = 'profile_events_frame'>
                <AccountPageEvents id={this.props.id} switcher={this.props.switcher}/>
            </div>
        );
    }
}