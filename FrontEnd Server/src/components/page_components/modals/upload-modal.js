import React from 'react';

const UploadModal = props => {
    const showHideClassName = props.show ? "upload-modal upload-display-block" : "upload-modal upload-display-none";
  
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <span className='close-button topright' 
                onClick={props.handleClose.bind(this)}>&times;</span>
                <form id='upload-form'>
                    <div id='form-image'>
                        <label>Image</label>
                        <img src={props.image} alt='No Image Uploaded Yet'/>
                        <input type='file' name='image' accept='image/*'
                        onChange={props.handlePreviewImage.bind(this)}/>
                    </div>
                    <div id='form-content'>
                        <label htmlFor='title'>Title</label>
                        <input type='text' name='title' id='title'/>

                        <label htmlFor='hashtags'>Image Tags</label>
                        <input type='text' name='hashtags' id='hashtags'/>
                        <div style={{display: 'inline-block'}}>
                            <p style={{fontSize: '10pt'}}>
                                Example: "cute-sleepy-dog-nighttime"
                            </p>
                            <p style={{color: 'red'}}>DISCLAIMER:</p> 
                            <p style={{fontSize: '10pt'}}>
                                <em>
                                    <strong>Image Tags</strong> are a way for 
                                    friends/other users to easily find related 
                                    images.
                                </em>
                            </p>
                        </div>

                        <br />

                        <input className='button' type='submit' value='Submit' onClick={props.handleClose.bind(this)}/>
                    </div>
                </form>
            </section>
        </div>
    );
  };

export default UploadModal;