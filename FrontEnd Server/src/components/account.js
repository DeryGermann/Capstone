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
            account_puzzles: [],
            account_friends: [],
            notifications: {
                incoming: [],
                outgoing: []
            },
            showUploadModal: false,
            showFriendModal: false,
            showNotifModal: false,
            imagePreview: 'placeholder_image.png',
            publicShareStatus: false,
            friendShareStatus: false,
        }

        // this.updatePublicShareSettings = this.updatePublicShareSettings.bind(this);
        // this.updateFriendShareSettings = this.updateFriendShareSettings.bind(this);

        this.getAccountData = this.getAccountData.bind(this);
    }

    componentDidMount = () => {
        // Will Read from the API and populate a variable
        this.getAccountData();

        // this.test_populate();
    }

    async getAccountData() {
        let check = {};

        await fetch('http://localhost:3001/getdata?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495', {
            method: "GET",
        })
        .then(res => res.json())
        .then(result => check = result);

        if (check.accounts.length !== 0) {
            this.populateVaraiables(check);
        }
    }
    populateVaraiables(data) {
        let notif = {
            incoming: [],
            outgoing: []
        };

        // Gets all the friends
        data.accounts[1].friendsList.forEach(friend => {
            fetch(`http://localhost:3001/accounts/${friend}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(result => this.setState({
                ...this.state,
                account_friends : [...this.state.account_friends, [`${result[0].firstName} ${result[0].lastName}`]]}));
        });

        // Gets all the names for the notifications
        data.accounts[1].requests.incoming.forEach(async id => {
            await fetch(`http://localhost:3001/accounts/${id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(result => notif.incoming.push(`${result[0].firstName} ${result[0].lastName}`));
        });
        data.accounts[1].requests.outgoing.forEach(async id => {
            await fetch(`http://localhost:3001/accounts/${id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(result => notif.outgoing.push(`${result[0].firstName} ${result[0].lastName}`));
            
            this.setState({notifications: notif});
        });
    }

    test_populate = () => {
        let test_l = [];
        for (let index = 1; index < 11; index++) {
            let test = {};

            test.image = `./test_images/image${index}.png`;
            test.tags = `#cool #reallycool #supercool`;
            test.title = `Test Image ${index}`;
            
            let rand = Math.floor(Math.random() * 4);

            if (rand === 0) {
                test.share = 'Both';
            } else if (rand === 1) {
                test.share = 'Shared';
            } else if (rand === 2) {
                test.share = 'Public';
            } else {
                test.share = 'Personal';
            }

            test_l.push(test);
        }

        this.setState({account_puzzles: test_l});
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

    showImagePreview = (evt) => {
        this.setState(
            {
                imagePreview: URL.createObjectURL(evt.target.files[0])
            }
        );
    }

    // updatePublicShareSettings = (evt) => {
    //     console.log(evt.target);

    //     // Call method to update database.
    // }
    // updateFriendShareSettings = (evt) => {
    //     console.log(evt.target);

    //     // Call method to update database.
    // }

    render() {
        console.log(this.state.notifications.incoming.length)
        let notification = 0;
        
        if (this.state.notifications.incoming && this.state.notifications.incoming.length) {
            notification = this.state.notifications.incoming.length;
        }

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
                                <NotifModal show={this.state.showNotifModal} 
                                handleClose={ evt => this.hideNotifModal(evt) }
                                notifs={this.state.notifications}/>
                                <div id='notif' onClick={evt => this.showNotifModal(evt)}>
                                    {notification}
                                </div>
                            </div>

                            <div>
                                <FriendsList friends={this.state.account_friends}
                                notifications={12}/>

                                <FriendsModal show={this.state.showFriendModal} 
                                handleClose={ evt => this.hideFriendModal(evt) }/>
                            </div>
                            <div className='button' id='friends-button' onClick={evt => this.showFriendModal(evt)}>
                                    Search For More Friends
                            </div>
                        </div>
                        <div id='account-puzzles'>
                            {
                                this.state.account_puzzles.map((view, i) => {
                                    let publicShareStatus = false;
                                    let friendShareStatus = false;

                                    if (view.share === 'Shared') {
                                        friendShareStatus = true;
                                    }

                                    if (view.share === 'Both') {
                                        friendShareStatus = true;
                                        publicShareStatus = true;
                                    }

                                    if (view.share === 'Public') {
                                        publicShareStatus = true;
                                    }

                                    return(<MediumPuzzleView 
                                        key={i}
                                        image={view.image}
                                        tags={view.tags}
                                        title={view.title}
                                        publicallyShared={publicShareStatus}
                                        friendsShared={friendShareStatus}/>)
                                })
                            }
                        </div>
                    </div>

                    <UploadModal show={this.state.showUploadModal} 
                    handleClose={ evt => this.hideUploadModal(evt) }
                    image={this.state.imagePreview}
                    handlePreviewImage={ evt => this.showImagePreview(evt) }/>
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