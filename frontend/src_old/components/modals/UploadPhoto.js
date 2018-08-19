import React from 'react';
import Modal from 'react-modal';
import { PlusIcon } from '../SvgIcons';

const UploadModal = (props) => {
  // console.log(props, 'modal');
  return (
    <Modal
      isOpen={!!props.show}
      contentLabel="Upload Photo"
      onRequestClose={props.handleToggleModal}
      closeTimeoutMS={200}
    >
      <div className="upload-modal">
        <PlusIcon className="upload-modal__icon" />
        <span className="upload-modal__text">Upload Photo</span>
        <div className="upload-modal__upload-box">
          <a className="upload-modal__button" aria-label="Upload Photo" role="button">
            <input className="upload-modal__input-upload btn" type="file" title="Choose a file to upload" accept="image/*" name="photo" onChange={props.handleFileChange} />
          </a>
        </div>
      </div>
      <div className="image-preview">
        {props.imageSrc ? <div className="image-preview__image-box"><img src={props.imageSrc} /></div> : null}
        <div className="upload-options">
          <button className="btn btn--cancel" onClick={props.handleToggleModal}>Cancel</button>
          <button className="btn btn--save" onClick={props.handleFileUpload}>Save</button>
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
