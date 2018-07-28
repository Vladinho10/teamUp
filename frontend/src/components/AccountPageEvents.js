import React,{Component} from 'react';
import moment from 'moment';
export default class AccountPageEvents extends Component{
    state = {

    }
   
    componentDidMount = () =>{
        console.log(this.props.id);
        fetch('/api/profile/' + this.props.id,{
          credentials:'include',
          method:'GET'
        }).then((res)=>{return res.json()}).then((profile) => {
            console.log(profile)
            let events = profile.user[0].own_events.concat(profile.user[0].attending_events);
            console.log(events);
            fetch('/api/events/profile_events$'+ this.props.id,{
                credentials:'include',
                method:'GET'
            }).then((res)=>{return res.json()}).then((data) =>{
                this.setState({
                    events:data.events
                });
            });
          
        });
      }
    render(){
        if(this.state.events){
            return this.state.events.map((el,i) => {
                return(
                    <div key={el._id} className='profile_event'>
                        <div className = 'profile_event_left'>
                            <div className='profile_event_img'>
                                <img src={el.photo} />
                            </div>
                            
                            <div className = 'profile_event_title'>
                                {el.title}
                            </div>
                        </div>
                        <div className = 'profile_event_right'>
                            <div className = 'profile_event_day'>
                                {moment(new Date(el.date)).format('LL')}
                            </div>
                            <div className='profile_event_time'>
                               <img src="./images/clock.png" alt="" height='20' width='20'/> {el.time.split(":")[0] + ' : ' + el.time.split(":")[1] }
                            </div>
                            <div className='profile_event_loc'>
                                <img src="./images/ev_ic.png" alt="" height='45' width='45'/>{el.location}
                            </div>
                            <div className='profile_event_type'>

                            </div>
                        </div>
                        
                    </div>
                )
            });
        }
        else{
            return(
                <div>OOPs</div>
            )
        }
        
    }
}