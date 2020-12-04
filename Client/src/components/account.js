import React, { Component } from 'react';
import Header from './page_components/header';
import Footer from './page_components/footer';

import FriendsList from './page_components/friends';
import UploadModal from './page_components/modals/upload-modal';
import MediumPuzzleView from './page_components/puzzle_views/medium-puzzle-view';
import FriendsModal from './page_components/modals/friends-modal';
import NotifModal from './page_components/modals/notification-modal';

class AccountPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            copyright: 'Copyright Dery Germann 2020',
            gbh: <a href='public' id='go-back-home-button'><p>&#8592; Go Back To Public Page</p></a>,
            account: {},
            account_puzzles: [],
            account_friends: [],
            friend_ids: [],
            notifications: {
                incoming: [],
                outgoing: []
            },
            account_id: "",
            all_requests: [],
            showUploadModal: false,
            showFriendModal: false,
            showNotifModal: false,
            publicShareStatus: false,
            friendShareStatus: false,
        }

        this.populateVaraiables = this.populateVaraiables.bind(this);
    }

    componentDidMount = () => {
        // Delete any of the puzzle session variables 
        sessionStorage.removeItem("image");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("height");
        sessionStorage.removeItem("width");

        fetch('http://localhost:3001/requests?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495', {
            method: "GET",
        })
        .then(res => res.json())
        .then(result => this.setState({ all_requests: result }))
        .catch(e => console.log(e));

        this.setState({ account: JSON.parse(sessionStorage.getItem('user')) }, () => {
            this.setState({ friend_ids: this.state.account.friendsList }, () => {
                this.setState({ account_id: this.state.account._id }, () => {
                    this.populateVaraiables();
                })
            });
        });
    }

    async populateVaraiables() {
        let notif = {
            incoming: [],
            outgoing: []
        };

        let puzzles = [];
        // Gets all the puzzles
        await fetch('http://localhost:3001/puzzles?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495', {
            method: "GET",
        }).then(res => res.json())
        .then(result => puzzles = result)
        .then(() => {
            let puzzle_holder = [];

            puzzles.forEach(puzzle => {
                if (puzzle.account_id === this.state.account_id) {
                    // if (puzzle.personal_puzzle.status !== "Shared" 
                    // && puzzle.personal_puzzle.hasOwnProperty("image")) {
                    if (!puzzle.shared_puzzle) {
                        puzzle.personal_puzzle.id = puzzle._id;
                        puzzle_holder.push(puzzle.personal_puzzle);
                    } else {
                        console.log(puzzle)
                        puzzle.shared_puzzle.id = puzzle._id;
                        puzzle_holder.push(puzzle.shared_puzzle);
                    }

                    this.setState({ account_puzzles : puzzle_holder });
                }
            });
        })
        .catch(e => console.log(e));
        

        // Gets all the friends
        this.state.friend_ids.forEach(async friend => {
            await fetch(`http://localhost:3001/accounts/${friend}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(result => this.setState({
                ...this.state,
                account_friends : [...this.state.account_friends, [`${result[0].firstName} ${result[0].lastName}`]]}));
        });

        // Assigns all the request ids for the current user
        this.state.all_requests.forEach(request => {
            if (request.account_id === this.state.account_id) {
                if (request.incoming_request) {
                    notif.incoming.push(request.incoming_request);
                } else {    
                    notif.outgoing.push(request.outgoing_request);
                }
            }
        });

        // Gets all the names for the notifications
        for (let i = 0; i < notif.incoming.length; i++) {
            await fetch(`http://localhost:3001/accounts/${notif.incoming[i]}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(result => notif.incoming[i] = `${result[0].firstName} ${result[0].lastName}`)
            .catch(e => console.log(e));
        }

        for (let i = 0; i < notif.outgoing.length; i++) {
            await fetch(`http://localhost:3001/accounts/${notif.outgoing[i]}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(result => notif.outgoing[i] = `${result[0].firstName} ${result[0].lastName}`)
            .catch(e => console.log(e));
        }

        this.setState({ notifications: notif });
    }

    showUploadModal = (evt) => {
        this.setState({showUploadModal: true});
    }
    hideUploadModal = (evt) => {
        this.setState({showUploadModal: false})
    }
    showFriendModal = (evt) => {
        this.setState({showFriendModal: true});
    }
    hideFriendModal = (evt) => {
        this.setState({showFriendModal: false})
    }
    showNotifModal = (evt) => {
        this.setState({showNotifModal: true});
    }
    hideNotifModal = (evt) => {
        this.setState({showNotifModal: false})
    }

    render() {
        let notification = 0;
        
        if (this.state.notifications.incoming && this.state.notifications.incoming.length) {
            notification = this.state.notifications.incoming.length;
        }

        let id = this.state.account_id;

        // console.log(this.state.account_puzzles)

        return (
            <div id='pageContent'>
                <div id='header'>
                    <Header 
                        redirect='signup' 
                        pageName='Log Out' 
                        goBackHome={this.state.gbh}
                    />
                </div>
                <div id='content'>

                    <div id='account-content-holder'>
                        <div id='friends-list'>
                            <div id='notif-title'>
                                <h4>Friends List</h4>
                                <NotifModal account_id={this.state.account_id}
                                friends={this.state.account_friends}
                                show={this.state.showNotifModal} 
                                handleClose={ evt => this.hideNotifModal(evt) }
                                notifs={this.state.notifications}/>
                                <div id='notif' onClick={evt => this.showNotifModal(evt)}>
                                    {notification}
                                </div>
                            </div>

                            <div>
                                <FriendsList friends={this.state.account_friends}/>

                                <FriendsModal account_id={this.state.account_id}
                                friendsList={this.state.account_friends}
                                notifications={this.state.notifications}
                                show={this.state.showFriendModal} 
                                handleClose={ evt => this.hideFriendModal(evt) }/>
                            </div>
                            <div className='button' id='friends-button' onClick={evt => this.showFriendModal(evt)}>
                                    Search For More Friends
                            </div>
                        </div>
                        <div id='account-puzzles'>
                            {
                                this.state.account_puzzles.map((view, i) => {
                                    let neither = false;
                                    let publicShareStatus = false;
                                    let friendShareStatus = false;

                                    if (view.hasOwnProperty("status")) {
    
                                        if (view.status === 'Shared') {
                                            friendShareStatus = true;
                                        }
    
                                        if (view.status === 'Both') {
                                            friendShareStatus = true;
                                            publicShareStatus = true;
                                        }
    
                                        if (view.status === 'Public') {
                                            publicShareStatus = true;
                                        }
                                    } else {
                                        neither = true;
                                    }

                                    return(<MediumPuzzleView 
                                        key={i}
                                        image={view.image}
                                        tags={view.tags}
                                        name={view.name}
                                        id={id}
                                        puzzle_id={view.id}
                                        friend_list={this.state.friend_ids}
                                        publicallyShared={publicShareStatus}
                                        friendsShared={friendShareStatus}
                                        neither={neither}/>)
                                })
                            }
                        </div>
                    </div>

                    <UploadModal show={this.state.showUploadModal} 
                    handleClose={ evt => this.hideUploadModal(evt) }
                    image={this.state.imagePreview}
                    accountId={id}/>
                    <div style={{marginTop: '10px'}} className='button' onClick={evt => this.showUploadModal(evt)}>
                            Click to Create a New Puzzle
                    </div>
                </div>
                <div id='footer'>
                    <Footer copyright={this.state.copyright} />
                </div>
            </div>
        );
    }
}

export default AccountPage;