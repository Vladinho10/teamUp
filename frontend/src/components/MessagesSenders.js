import React,{Component} from 'react';
import Header from './Header';
import Contacts from './Contacts';

export default class MessagesSenders extends Component{
    state = {

    }
    
    componentDidMount(){
        fetch('/api/myid',{
            credentials:'include',
          }).then((res)=>{return res.json()}).then((data) => {
            let my_id = data.id;
            let grouped_data = [];
            let help = 0;
            fetch('/api/messages',{
                credentials:'include'
            }).then((res) => {
                return res.json()
            }).then((data)=>{
                
                for(let i = 0;i<data.messages.length;i++){
                if(help == 0){
                    let c=data.messages[i].from._id==my_id?data.messages[i].to:data.messages[i].from;
                    grouped_data.push({contact:c,messages:[data.messages[i]]});
                    help++;
                }else{
                    let exists = false;
                    for(let j = 0;j<grouped_data.length;j++)
                    {
                        if(grouped_data[j].contact._id == data.messages[i].from._id || grouped_data[j].contact._id == data.messages[i].to._id){
                            grouped_data[j].messages.push(data.messages[i]);
                            exists = true;
                        }
                    }
                    if(exists){
                        continue;
                    }
                    else{
                        let co = data.messages[i].from._id==my_id?data.messages[i].to:data.messages[i].from;
                        grouped_data.push({contact:co,messages:[data.messages[i]]});
                    }                
            }
        }
            this.setState({
                messages:data.messages,
                ordered_messages:grouped_data,
                my_id:my_id,
                contacts:grouped_data
            });
            });
            
        });
        
        
    }
    render(){
        return(
            <React.Fragment>
                <Header />
                <div className = 'message_window'>
                    <Contacts contacts = {this.state.contacts} my_id={this.state.my_id} /> 
                </div>
                          
            </React.Fragment>
        )
    }
}