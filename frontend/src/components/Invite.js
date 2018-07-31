import React,{Component} from 'react';

export default class Invite extends Component{
    componentDidMount() {
        document.addEventListener("click", this.handleOutsideClick)
    }
    componentWillUnmount() {
        document.removeEventListener("click")
    }
    handleOutsideClick = ev => {
        if(event.target.id != 'invite_btn'){
            let modal = this.refs.modal;
            modal.style.display = "none";
        }
    }
    state={

    }
    handleInviteButton = ()=>{
        let modal = this.refs.modal;
        modal.style.display = "block";
    }
    handleClose = ()=>{
        let modal = this.refs.modal;
        modal.style.display = "none";
    }
    render(){
        return(
            <div className='invite_btn_frame'>
                <div className = 'invite_btn' >
                    <button onClick = {this.handleInviteButton} id = 'invite_btn'>
                        + Invite
                    </button>
                </div>
                <div id="myModal" className="modal" ref='modal'>
                    <div className="modal-content_invite">
                        <span className="close_invite" ref='close' onClick = {this.handleClose}>&times;</span>
                        <p>Some text in the Modal..</p>
                    </div>
                </div>
            </div>
        )
    }
}