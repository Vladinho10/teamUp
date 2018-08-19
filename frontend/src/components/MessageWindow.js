import React,{Component} from 'react';

export default class MessageWindow extends Component{
    state = {
        contacts:this.props.contacts?this.props.contacts:[]
    }
    static getDerivedStateFromProps(props,state){
        
        return {contacts:props.contacts}
    }
    unseenCounter = (arr)=>{
        let unseen = 0;
        for(let i = 0;i<arr.length;i++){
            if(arr[i].seen == false){
                unseen++;
            }
        }
        return unseen;
    }
    render(){
        return(
            
            
        )
    }
}