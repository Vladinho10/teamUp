import React,{Component} from 'react';
import moment from 'moment';

export default class AccountPageEvents extends Component{
    state = {
        switcher:this.props.switcher
    }
    static getDerivedStateFromProps=(props,state)=>{ 
      return {switcher:props.switcher};
    }
    componentDidMount = () =>{
        fetch('/api/profile/' + this.props.id,{
          credentials:'include',
          method:'GET'
        }).then((res)=>{return res.json()}).then((profile) => {
            console.log(profile,'125151515')
            let events = profile.own_events;
            console.log(events);
            fetch('/api/events/profile_events$'+ this.props.id,{
                credentials:'include',
                method:'GET'
            }).then((res)=>{return res.json()}).then((data) =>{
                this.setState({
                    own_events:data.own_events,
                    attending_events:data.attending_events,
                    switcher:'admin'
                });
            });
          
        });
      }
    render(){
        console.log(this.state,'545454545450');
        if(this.state.own_events || this.state.attending_events ){
            console.log('boommmmmmmmm');
            let events = [];
            if(this.state.switcher == 'admin'){
                 events = this.state.own_events;
                console.log(events,'boom');
            }else{
                 events = this.state.attending_events;
            }
            return events.map((el,i) => {
                return(
                    
                    <div className = 'profile_event_frame' key ={el._id} >
                        <div className = 'profile_event_img_frame'>
                            <div className = 'profile_event_img'>
                                <img src={el.photo} alt=""/>
                            </div>
                        </div>
                        <div className = 'profile_event_info_frame'>
                            <div className = 'profile_event_info_header'>
                                <div className = 'profile_event_title'>
                                    {el.title}
                                </div>
                                <div className = 'profile_event_date'>
                                    {moment(new Date(el.date)).format('LL').split(',')[0]}
                                </div>
                            </div>
                            <div className = 'profile_event_info_footer'>
                                <div className = 'profile_event_description'>
                                    <div className = 'profile_event_dn'>
                                        {el.description.slice(0,25)}
                                    </div>
                                    <div className = 'profile_event_count'>
                                        <div className = 'profile_name_count_part'>
                                            <img src="./images/people.png" height='18' width='20' />
                                            {el.quantity}
                                        </div>
                                        <div className = 'profile_name_count_part'>
                                            Missing {el.quantity-el.players.length}
                                        </div>
                                    </div>
                                </div>
                                <div className = 'profile_event_under_footer'>
                                <div>
                                        {el.type}
                                    </div>
                                    <div>
                                       <img src="./images/clock.png" height='20' width='20'/> {el.time}
                                    </div>
                                    <div>
                                        <img src="./images/ev_loc.png" height='20' width='20'/>{el.location.slice(0,10)}
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
                <div>OOPs</div>
            )
        }
        
    }
}