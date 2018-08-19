import React, { Component } from 'react';

export default class Notification extends Component{
    state = {
        notifications:[],
        unseen:''
    }
    componentDidMount() {
        document.addEventListener("click", this.handleOutsideClickNotific);
        fetch('/api/notifications',{
            credentials:'include'
        }).then((res) => {
            return res.json()
        }).then((notifications)=>{
            let unseen = 0;
            for(let i = 0;i<notifications.notify.length;i++){
                if(notifications.notify[i].seen == false){
                    unseen++;
                }
            }
            this.setState({
                notifications:notifications.notify,
                unseen:unseen
            })
        });
    }
    componentWillUnmount() {
        document.removeEventListener("click",this.handleOutsideClickNotific);
    }
    handleOutsideClickNotific = event => {
        let drop_content = this.refs.drop_content;
        if(!drop_content.contains(event.target) && event.target.id != 'not_img'){
            let modal = this.refs.modal;
            this.refs.drop_content.style.display = "none";
        }
    }
    handleClickNotification=(e)=>{
        this.refs.drop_content.style.display = 'block';
        this.refs.drop_content.id = 'notific_slide';
        let seen_notifications = this.state.notifications.map((notification)=>{
            return notification._id;
        });
        if(seen_notifications){
            fetch('/api/notifications/seen',{
            credentials:'include',
            method:'post',
            body:JSON.stringify({
                seen:seen_notifications
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            return res.json();
        }).then((data) =>{
            this.setState({
                unseen:''
            });
        });
        }
        
    }
    redirectEventPage = (e, id) => {
        this.props.history.push({
          pathname: `/eventpage/${id}`
      });
    }
    render(){
        return(
            <React.Fragment>
                <a role = 'link' ref = 'notification' id = 'notific' onClick = {this.handleClickNotification} > <img src="./images/notific.png" height='25' width='25' id = 'not_img'/>   </a>
                <div className={this.state.unseen?'unseen':'seen'} >{this.state.unseen}</div>
                <div className = 'dropdown_list' ref = 'drop_content'>
                    <div className='notification_list'>
                    { this.state.notifications.map((notification)=>{
                        return(
                            <div className = 'notification_row'  key = {notification._id} onClick = {(e)=>{this.redirectEventPage(notification.event,notification.event._id)}}  >
                                <div className= 'notification_img'>
                                   <img src={notification.from.photo} className='notification_img' height='50' width='50'/>
                                </div>
                                <div>
                                    {notification.type == 'invite'?'invited':notification.type+'ed'}
                                </div>
                                <div>
                                    {notification.event.title.slice(0,8)}
                                </div>
                                <div>
                                    <div className={`notification_type ${notification.type}`}>

                                    </div>
                                </div>
                            </div>
                            );
                    })}
                    </div>
                    
                </div>
            </React.Fragment>
        )
    }
}