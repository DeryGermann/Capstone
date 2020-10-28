import React from 'react';

const FriendsModal = props => {
    const showHideClassName = props.show ? "friends-modal friends-display-block" : "friends-modal friends-display-none";
  
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <span className='close-button topright' 
                onClick={props.handleClose.bind(this)}>&times;</span>
                
                <form>
                    <input type='text' name='name' />
                </form>
                
            </section>
        </div>
    );
  };

export default FriendsModal;