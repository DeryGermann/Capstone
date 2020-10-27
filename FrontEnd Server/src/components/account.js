import React, { Component } from 'react';
import Header from './page_components/header';
import Footer from './page_components/footer';

import FriendsList from './page_components/friends';
import UploadModal from './page_components/upload';
import MediumPuzzleView from './page_components/puzzle_views/medium-puzzle-view';

class AccountPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            copyright: 'Copyright Dery Germann 2020',
            gbh: <a href='public' id='go-back-home-button'><p>&#8592; Go Back To Public Page</p></a>,
            account_puzzles: [],
            account_friends: [
                {
                    name: 'Jim'
                },
                {
                    name: 'Bob'
                },
                {
                    name: 'Billy'
                },
                {
                    name: 'Jimbo'
                },
                {
                    name: 'Timothy'
                },
            ],
            showUploadModal: false,
            imagePreview: null,
            publicShareStatus: false,
            friendShareStatus: false,
        }

        this.updatePublicShareSettings = this.updatePublicShareSettings.bind(this);
        this.updateFriendShareSettings = this.updateFriendShareSettings.bind(this);
    }

    componentDidMount = () => {
        // Will Read from the API and populate a variable
        this.test_populate();
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

    showImagePreview = (evt) => {
        this.setState(
            {
                imagePreview: URL.createObjectURL(evt.target.files[0])
            }
        );
    }

    updatePublicShareSettings = (evt) => {

        // Call method to update database.
    }
    updateFriendShareSettings = (evt) => {
        // Call method to update database.
    }

    render() {
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
                        <FriendsList friends={this.state.account_friends}/>
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
                                        friendsShared={friendShareStatus}
                                        publicChange={evt => this.updatePublicShareSettings(evt)}
                                        friendChange={evt => this.updateFriendShareSettings(evt)}
                                        />)
                                })
                            }
                        </div>
                    </div>

                    <UploadModal show={this.state.showUploadModal} 
                    handleClose={ evt => this.hideUploadModal(evt) }
                    image={this.state.imagePreview}
                    handlePreviewImage={ evt => this.showImagePreview(evt) }/>
                    <div className='button' onClick={evt => this.showUploadModal(evt)}>
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