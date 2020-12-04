import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class NotifModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refresh: false,
            all_users: [],
        }

        this.acceptRequest = this.acceptRequest.bind(this);
        this.declineOutGoingRequest = this.declineOutGoingRequest.bind(this);
    }

    componentDidMount = () => {
        // Loads all the users for faster quering.
        fetch('http://localhost:3001/accounts/listall?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495', {
            method: "GET",
        })
        .then(res => res.json())
        .then(result => this.setState({ all_users : result }))
        .catch(e => console.log(e));
    }

    acceptRequest = (evt) => {
        let other_user_id;
        // Gets user id from the selected request
        this.state.all_users.forEach(user => {
            if (`${user.firstName} ${user.lastName}` === evt.target.id) {
                other_user_id = user._id;
            }
        });

        // Deletes request from both users
        fetch(`http://localhost:3001/requests/outgoing/${other_user_id}/${this.props.account_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
            method: "DELETE",
        }).then(res => console.log(res))
        .catch(e => console.log(e));
        fetch(`http://localhost:3001/requests/incoming/${this.props.account_id}/${other_user_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
            method: "DELETE",
        }).then(res => console.log(res))
        .catch(e => console.log(e));

        // Adds each other
        fetch(`http://localhost:3001/accounts/${this.props.account_id}/${other_user_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
            method: "PUT",
        }).catch(e => console.log(e));
        fetch(`http://localhost:3001/accounts/${other_user_id}/${this.props.account_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
            method: "PUT",
        }).catch(e => console.log(e));

        this.setState({ refresh : !this.state.refresh });
    }
    declineOutGoingRequest = (evt) => {
        let other_user_id;
        // Gets user id from the selected request
        this.state.all_users.forEach(user => {
            if (`${user.firstName} ${user.lastName}` === evt.target.id) {
                other_user_id = user._id;
            }
        });

        // Deletes request from both users
        fetch(`http://localhost:3001/requests/incoming/${other_user_id}/${this.props.account_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
            method: "DELETE",
        }).then(res => console.log(res))
        .catch(e => console.log(e));
        fetch(`http://localhost:3001/requests/outgoing/${this.props.account_id}/${other_user_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
            method: "DELETE",
        }).then(res => console.log(res))
        .catch(e => console.log(e));

        this.setState({ refresh : !this.state.refresh });
    }
    declineIncomingRequest = (evt) => {
        let other_user_id;
        // Gets user id from the selected request
        this.state.all_users.forEach(user => {
            if (`${user.firstName} ${user.lastName}` === evt.target.id) {
                other_user_id = user._id;
            }
        });

        // Deletes request from both users
        fetch(`http://localhost:3001/requests/outgoing/${other_user_id}/${this.props.account_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
            method: "DELETE",
        }).then(res => console.log(res))
        .catch(e => console.log(e));
        fetch(`http://localhost:3001/requests/incoming/${this.props.account_id}/${other_user_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
            method: "DELETE",
        }).then(res => console.log(res))
        .catch(e => console.log(e));

        this.setState({ refresh : !this.state.refresh });
    }

    render() {
        const showHideClassName = this.props.show ? "notif-modal notif-display-block" : "notif-modal notif-display-none";

        if (this.state.refresh) {
            return <Redirect to="account" />
        }
      
        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    <span className='close-button topright' 
                    onClick={this.props.handleClose.bind(this)}>&times;</span>
                    
                    <h4>Friend Requests</h4>
                    <div id='incoming-req'>
                        {
                            this.props.notifs.incoming.map((name, i) => {
                                return(
                                    <div key={i} className='req'>
                                        <p className='name'>{name}</p>
                                        <span onClick={this.acceptRequest} id={name}>&#x2713;</span>
                                        <span onClick={this.declineIncomingRequest} id={name}>&times;</span>
                                    </div>
                                )
                            })
                        }
                    </div>
    
                    <h4>Sent Friend Requests</h4>
                    <div id='outgoing-req'>
                        {
                            this.props.notifs.outgoing.map((name, i) => {
                                return(
                                    <div key={i} className='req'>
                                        <p className='name'>{name}</p>
                                        <span onClick={this.declineOutGoingRequest} id={name}>&times;</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                </section>
            </div>
        );
    }
  };

export default NotifModal;