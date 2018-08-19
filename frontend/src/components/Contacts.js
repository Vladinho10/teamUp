import React,{Component} from 'react';

export default class Contacts extends Component{
    state = {
        contacts:this.props.contacts?this.props.contacts:[],
        chat_member:''
    }
    static getDerivedStateFromProps(props,state){
        
        return {contacts:props.contacts,my_id:props.my_id}
    }
    unseenCounter = (arr,user_id)=>{
        let unseen = 0;
        for(let i = 0;i<arr.length;i++){
            if(arr[i].seen == false && arr[i].from._id!=user_id){
                unseen++;
            }
        }
        return unseen;
    }
    handleMessage = (id)=>{
               
        fetch('/api/contact_messages/'+id,{
            credentials:'include'
        }).then((res)=>{return res.json()})
        .then((data)=>{
            this.setState({
                conversation:data,
                to:id,
                chat_member:data.data[0].to._id == this.props.my_id?data.data[0].from:data.data[0].to 
            });
            this.refs.msg_box.style.display = 'block';
            this.refs.unseen.innerText!=0?this.refs.unseen.style['background-color'] = 'green':this.refs.unseen.innerText = '';
            this.refs.unseen.innerText = '';
        });
    }
    handleMessageSending = (e)=>{
        let msg = this.refs.new_message.value;
        this.refs.new_message.value = '';
        if(msg){
            fetch('/api/new_message',{
                    credentials: 'include',
                    method: 'POST',
                    body:JSON.stringify({
                        payload:msg,
                        to:this.state.to
                    }),
                    headers: { 'Content-Type': 'application/json ' }
            }).then((res)=>{
                return res.json();
            }).then((data)=>{
                let new_conversation = Object.assign({},this.state.conversation);
                new_conversation.data.unshift(data);
                this.setState({
                    conversation:new_conversation
                });
                
            });
        }
    }
    render(){
        return(
            <div className = 'message_display'>
            <div className = 'chat_member'>
                {this.state.chat_member?<div><img src={this.state.chat_member.photo} height='80' width = '80' id = 'selected_contact'/><div>{this.state.chat_member.name}</div></div>:''}
            </div>
            <div className = 'contacts'>
                {this.state.contacts?this.state.contacts.map((el) => {
                    return (
                        <div className = 'notification_row'  key = {el.contact._id} ref = 'contact' id = {el.contact._id}  onClick={(e)=>{this.handleMessage(el.contact._id)}}>
                                <div className= 'notification_img'>
                                   <img src={el.contact.photo} className='notification_img' height='50' width='50'/>
                                </div>
                                <div>
                                    {el.contact.name}
                                </div>
                                <div  className={this.unseenCounter(el.messages)?'contact_unseen':'' }ref='unseen'>
                                    {this.unseenCounter(el.messages,this.state.my_id)==0?'':this.unseenCounter(el.messages,this.state.my_id)}
                                </div>
                        </div>   
                    )}):""}
            </div>
            <div className='messageContent'>
                <div className = 'conversation'>
                    {this.state.conversation?this.state.conversation.data.map((el)=>{
                                return(
                                    <div key = {el._id} className = {el.to._id == this.state.my_id?'message_sent_me':'my_message'}>
                                    {el.payload} {el.to._id == this.state.my_id?<img src={el.from.photo} alt="" height = '50' width = '50' className='contact_img_conversation' />:''}      
                                    </div>
                                )
                            }):''}

                    
                </div>
                <div className='msg_box' ref='msg_box' >
                        <input type="text" id = 'msg_input' ref = 'new_message'/>
                        <button id = 'msg_contact' onClick={()=>{this.handleMessageSending()}}>Send</button>
                </div>
            </div>
            
            </div>
            
        )
    }
}