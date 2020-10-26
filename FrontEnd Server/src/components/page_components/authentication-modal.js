import React from 'react';

const AuthenticationModal = props => {
    const showHideClassName = props.show ? "modal display-block" : "modal display-none";
  
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <span className='close-button topright' 
                onClick={props.handleClose.bind(this)}>&times;</span>
                
                
            </section>
        </div>
    );
  };

export default AuthenticationModal;