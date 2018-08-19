import React,{Component} from 'react';

export default class Invite extends Component{
    state={

    }
    static getDerivedStateFromProps=(props,state)=>{ 
        
        return {profile:props.profile};
      }
    componentDidMount() {
        
        //document.addEventListener("click", this.handleOutsideClick);
        fetch('/api/user/me',{
            credentials:'include'
        }).then((res)=>{
            return res.json();
        }).then((me)=>{
            fetch('/api/notification_check_invite',{
                credentials:'include',
                method:'post',
                body:JSON.stringify({
                to:this.props.id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }}).then((res)=>{
                return res.json();
            }).then((events)=>{
                let filtered_events = me.own_events;
                for(let i = 0;i<me.own_events.length;i++){
                    for(let j =0;j<events.events.length;j++){
                        if(events.events[j].event == me.own_events[i]._id){
                            filtered_events[i].invited = true;
                        }
                    }
                }
                this.setState({
                    own:filtered_events
                });        
            });
            
            
        })
    }
    notificationEmitter = (e) =>{
        let ev = e.target; //in callback e is null
        ev.disabled = true;
        fetch('/api/notification_creater',{
            credentials:'include',
            method:'post',
            body:JSON.stringify({
                to:this.state.profile._id,
                type:'invite',  //can be join,unjoin,invite,reminder
                event:e.target.id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res)=> {return res.json()}).then((data)=>{
            ev.innerHTML = 'Invited';
            ev.style.backgroundColor = 'gray';
        });
        
    }
   
    render(){
        let events = this.state.own?this.state.own:[];
        return events.map((event)=>{
            return(
                <div key={event._id} className = 'invitation_div'>
                   <div className='border_bottom_invite_list'>{event.title.slice(0,10)}</div> 
                   <div><button className={event.invited?'invited_btn':'invite_btn1'} id={event._id} onClick={this.notificationEmitter} disabled = {event.invited?'disabled':''} > {event.invited?'Invited':'Invite'}</button></div>
                </div>
            );
        });
    }
}
