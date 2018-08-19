import React,{Component} from 'react';
    
export default class TypeMessage extends Component{
    state={

    }
    handleMessageSending=()=>{
        let msg = this.refs.msg.value;
        this.refs.msg.value = '';
        if(msg){
            fetch('/api/new_message',{
                    credentials: 'include',
                    method: 'POST',
                    body:JSON.stringify({
                        payload:msg,
                        to:this.props.to
                    }),
                    headers: { 'Content-Type': 'application/json ' }
            }).then((res)=>{
                return res.json();
            }).then((data)=>{
            });
        }
    }
    render(){
        return(
            <div id = 'type_msg' >
                <input type="text" name="msg" id="typed_msg" ref = 'msg'/>
                <button id = 'send_msg' onClick={()=>this.handleMessageSending()}>Send</button>
            </div>
        )
    }
}