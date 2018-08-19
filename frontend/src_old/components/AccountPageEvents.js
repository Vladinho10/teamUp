import React,{Component} from 'react';
import moment from 'moment';
import { LocationIcon, CheckedIcon, QuestionIcon } from './SvgIcons';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
class AccountPageEvents extends Component{
    state = {
        switcher:this.props.switcher
    }
    static getDerivedStateFromProps=(props,state)=>{ 
        console.log('this are props',props);
      return {switcher:props.switcher};
    }
    redirectEventPage = (e, id) => {
        console.log(this.props);
        this.props.history.push({
          pathname: `/eventpage/${id}`
      });
    }
    checkEventIsMine = (my_id,players) => {
            return players.includes(my_id);
    }
    handleJoinUnjoin = (id,ev) =>{
        ev.disabled = true;
        ev.className=ev.className == 'profile_join'?'profile_unjoin':'profile_join'; 
        fetch('/api/add_or_delete_participant',{
            credentials:'include',
            method:'post',
            body: JSON.stringify({
                ev_id:id,
                action:ev.innerText=='JOIN'?'add':'delete'
            }),
            headers: { 
                'Content-type': 'application/json' 
            }

        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            ev.innerText = ev.innerText=='JOIN'?'UNJOIN':'JOIN';
            ev.disabled = false;
        });
    }
    componentDidMount = () =>{
        let info;
        fetch('/api/profile/' + this.props.id,{
          credentials:'include',
          method:'GET'
        }).then((res)=>{return res.json()}).then((profile) => {
            let events = profile.own_events;
            fetch('/api/events/profile_events$'+ this.props.id,{
                credentials:'include',
                method:'GET'
            }).then((res)=>{return res.json()}).then((data) =>{
                info = data;
                fetch('/api/myid',{
                    credentials:'include',
                  }).then((res)=>{return res.json()}).then((data) => {
                      
                    this.setState({
                        own_events:info.own_events,
                        attending_events:info.attending_events,
                        switcher:'admin',
                        id:data.id
                    });
                });
                
            });
          
        });
      }
    render(){
        console.log(this.state);
        if(this.state.own_events || this.state.attending_events ){
            let events = [];
            if(this.state.switcher == 'admin'){
                 events = this.state.own_events;
            }else{
                 events = this.state.attending_events;
            }
            return events.map((el,i) => {
                return(
                    <div className = 'profile_event_frame' key ={el._id} >
                        <div className = 'profile_event_img_frame'>
                            <div className = 'profile_event_img'>
                                <img src={el.photo?el.photo:'./images/default.jpg'} alt=""/>
                                <div className = 'profile_event_date'>
                                    {moment(new Date(el.date)).format('ll').split(',')[0]}
                                </div>
                                {!this.checkEventIsMine(this.state.id,el.admins)?
                                <div className ='join_from_profile' >
                                    <button className={this.checkEventIsMine(this.state.id,el.players)?'profile_unjoin':'profile_join'} onClick = {(e)=>{ let ev = e.target;this.handleJoinUnjoin(el._id,ev);}}>
                                        {this.checkEventIsMine(this.state.id,el.players)?'UNJOIN':'JOIN'}
                                    </button>
                                </div>:''
                                }
                            </div>
                        </div>
                        <div className = 'profile_event_info_frame' onClick = {(e)=>this.redirectEventPage(el,el._id)}>
                            <div className = 'profile_event_info_header'>
                                <div className = 'profile_event_title'>
                                    {el.title}
                                </div>
                            </div>
                            <div className = 'profile_event_info_footer'>
                                <div className = 'profile_event_description'>
                                    <div className = 'profile_event_dn'>
                                        {el.description.slice(0,25)}
                                    </div>
                                    <div className = 'profile_event_count'>
                                        <div className = 'profile_name_count_part'>
                                            Going {el.players.length}
                                        </div>
                                        <div className = 'profile_name_count_part missing'>
                                              Missing {el.quantity-el.players.length > 0? el.quantity-el.players.length:0}
                                        </div>
                                    </div>
                                </div>
                                <div className = 'profile_event_under_footer'>
                                    <div className='ev_type'>
                                        {el.type}
                                    </div>
                                    <div>
                                        {el.time}
                                    </div>
                                    <div>
                                        <LocationIcon role='icon' />{el.location.slice(0,10)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            });
        }
        else{
            return(
                <div></div>
            )
        }
        
    }
}
export default connect()(AccountPageEvents);