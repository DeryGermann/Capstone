import React from 'react';

const NotifModal = props => {
    const showHideClassName = props.show ? "notif-modal notif-display-block" : "notif-modal notif-display-none";
  
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <span className='close-button topright' 
                onClick={props.handleClose.bind(this)}>&times;</span>
                
                <h4>Friend Requests</h4>
                <div id='incoming-req'>
                    {
                        props.notifs.incoming.map((name, i) => {
                            return(
                                <div key={i} className='req'>
                                    <p className='name'>{name}</p>
                                    <span>&#x2713;</span>
                                    <span>&times;</span>
                                </div>
                            )
                        })
                    }
                </div>

                <h4>Sent Friend Requests</h4>
                <div id='outgoing-req'>
                    {
                        props.notifs.outgoing.map((name, i) => {
                            return(
                                <div key={i} className='req'>
                                    <p className='name'>{name}</p>
                                    <span>&times;</span>
                                </div>
                            )
                        })
                    }
                </div>
                
            </section>
        </div>
    );
  };

export default NotifModal;