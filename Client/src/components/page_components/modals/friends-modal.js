import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class FriendsModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            all_users : [],
            searchName: "",
            refresh: false,
        }

        this.filterSearchResults = this.filterSearchResults.bind(this);
        this.sendFriendRequest = this.sendFriendRequest.bind(this);
    }

    componentDidMount = () => {
        this.getAllUsers();
    }

    getAllUsers = () => {
        fetch('http://localhost:3001/accounts/listall?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495', {
            method: "GET",
        })
        .then(res => res.json())
        .then(result => this.setState({all_users : result}))
        .catch(e => console.log(e));
    }

    filterSearchResults = (evt) => {
        this.setState({
            searchName : evt.target.value
        });
    }
    sendFriendRequest = (evt) => {
        // Their account ID
        // evt.target.id
        // My account ID
        // this.props.account_id

        this.setState({ refresh: !this.state.refresh });

        // Send OUTGOING to the other user's account
        fetch('http://localhost:3001/requests?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495', {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', 
            }),
            body: `account_id=${this.props.account_id}&outgoing_request=${evt.target.id}`
        });

        // Send INCOMING to the user's account
        fetch('http://localhost:3001/requests?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495', {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', 
            }),
            body: `account_id=${evt.target.id}&incoming_request=${this.props.account_id}`
        }).then(this.setState({ refresh: true }));
    }
    
    render = () => {
        const showHideClassName = this.props.show ? "friends-modal friends-display-block" : "friends-modal friends-display-none";

        let f_list = [];

        // console.log(!this.props.notifications.outgoing.includes(`Jim Bo Bo`))
        // console.log(this.props.friendsList.includes(`Daniil Baydak`));
        // console.log(this.props.friendsList)
        // console.log(typeof this.props.notifications.outgoing)
        this.props.friendsList.forEach(f => f_list.push(f[0]));

        if (this.state.refresh) {
            return <Redirect to="account" />
        }

        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    <span className='close-button topright' 
                    onClick={this.props.handleClose.bind(this)}>&times;</span>
                    
                    <label htmlFor='searchName'>Search For a User </label>
                    <input type='text' name='name' id='searchName' autoComplete='off'
                    onChange={ this.filterSearchResults }
                    value={ this.state.searchName }/>

                    <div id='user-list' style={{paddingTop: '10px'}}>
                        {
                            this.state.all_users
                            // Makes sure current user does not appear in the all user tab
                            .filter(user => user._id !== this.props.account_id)
                            
                            // Makes sure that the users in the requests page does not appear
                            .filter(user => !this.props.notifications.outgoing.includes(`${user.firstName} ${user.lastName}`))
                            .filter(user => !this.props.notifications.incoming.includes(`${user.firstName} ${user.lastName}`))

                            // Makes sure friends dont appear in the users list
                            .filter(user => !f_list.includes(`${user.firstName} ${user.lastName}`))
                            
                            // Filters all users by their first and last name
                            .filter(user => user.firstName.toLowerCase().includes(this.state.searchName) 
                            || user.lastName.toLowerCase().includes(this.state.searchName))

                            .map((user, i) => {
                                return(
                                    <div key={i} className='req'>
                                        <p>
                                            { user.firstName } { user.lastName }
                                        </p>
                                        <span onClick={this.sendFriendRequest} id={user._id}>Send Request</span>
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

export default FriendsModal;