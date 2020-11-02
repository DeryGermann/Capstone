import React, { Component } from 'react';

class FriendsModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            all_users : [],
            searchName: ""
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
        console.log(evt.target.id);
    }
    
    render = () => {
        const showHideClassName = this.props.show ? "friends-modal friends-display-block" : "friends-modal friends-display-none";

        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    <span className='close-button topright' 
                    onClick={this.props.handleClose.bind(this)}>&times;</span>
                    
                    <label htmlFor='name'>Search For a User </label>
                    <input type='text' name='name' id='name'
                    onChange={ this.filterSearchResults }
                    value={ this.state.searchName }/>

                    <div id='user-list' style={{paddingTop: '10px'}}>
                        {
                            this.state.all_users
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