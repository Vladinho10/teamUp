import React,{Component} from 'react';
import InvitationList from './InvitationList';
export default class Invite extends Component{
    state={

    }
    componentDidMount() {
        document.addEventListener("click", this.handleOutsideClick);
    }
    componentWillUnmount() {
        document.removeEventListener("click",this.handleOutsideClick);
    }
    handleOutsideClick = event => {
        let content = this.refs.content;
        if(event.target.id != 'invite_btn' && !content.contains(event.target)){
            let modal = this.refs.modal;
            modal.style.display = "none";
        }
    }
    handleInviteButton = ()=>{
        let modal = this.refs.modal;
        modal.style.display = "block";
    }
    render(){
        return(
            <div className='invite_btn_frame'>
                <div className = 'invite_btn' >
                    <button onClick = {this.handleInviteButton} id = 'invite_btn' className='invite_btn_style'>
                        + Invite
                    </button>
                </div>
                <div id="myModal" className="modal_invite" ref='modal'>
                    <div className="modal-content_invite" ref = 'content'>
                                <InvitationList profile={this.props.profile} id = {this.props.id} />    
                    </div>
                </div>
            </div>
        )
    }
}