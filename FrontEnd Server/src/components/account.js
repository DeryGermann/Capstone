import React, { Component } from 'react';
import Header from './page_components/header';
import Footer from './page_components/footer';

import SmallPuzzleView from './page_components/puzzle_views/small-puzzle-view';
import FriendsList from './page_components/friends';
import UploadModal from './page_components/upload';

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
            imagePreview: null
        }
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
                                    return(<SmallPuzzleView 
                                        key={i}
                                        image={view.image}
                                        tags={view.tags}
                                        title={view.title}/>)
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