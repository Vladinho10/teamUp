import React, { Component } from 'react';

export default class Message extends Component{
    state = {
        messages:[],
        unseen:''
    }
    
    redirectContactsPage = () => {
        this.props.history.push({
          pathname: '/messages'
      });
    }
    componentDidMount() {
        let grouped_data = [];
        let help = 0;
        let my_id ;
        fetch('/api/myid',{
            credentials:'include',
          }).then((res)=>{return res.json()}).then((data) => {
            let my_id = data.id;
            fetch('/api/messages',{
                credentials:'include'
            }).then((res) => {
                return res.json()
            }).then((data)=>{
                let unseen = 0;
                
                for(let i = 0;i<data.messages.length;i++){
                    if(data.messages[i].seen == false && data.messages[i].from._id != my_id){
                        unseen++;
                    }
                if(help == 0){
                    grouped_data.push({sender:data.messages[i].from,messages:[data.messages[i]]});
                    help++;
                }else{
                    let exists = false;
                    for(let j = 0;j<grouped_data.length;j++)
                    {
                        if(grouped_data[j].sender._id == data.messages[i].from._id ){
                            grouped_data[j].messages.push(data.messages[i]);
                            exists =true;
                        }
                    }
                    if(exists){
                        continue;
                    }
                    else{
                        grouped_data.push({sender:data.messages[i].from,messages:[data.messages[i]]});
                    }                
            }
        }
            this.setState({
                messages:data.messages,
                ordered_messages:grouped_data,
                unseen:unseen,
                my_id:my_id
            });
            });
            
        });
        
        
    }
    render(){
        return(
            <React.Fragment>
                <a role = 'link' ref = 'message' id = 'message' > <img src="./images/message.png" height='30' width='30' id = 'mess_img' onClick = {this.redirectContactsPage}/>   </a>
                <div className={this.state.unseen?'unseen':'seen'} ref = 'unseen' >{this.state.unseen}</div>
            </React.Fragment>
        )
    }
}
