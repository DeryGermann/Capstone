import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DeletePuzzle from '../modals/deletePuzzle-modal';

class MediumPuzzleView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteModal: false,
            refresh: false,
            public: this.props.publicallyShared,
            friend: this.props.friendsShared
        }

        this.sharePublic = this.sharePublic.bind(this);
        this.shareFriend = this.shareFriend.bind(this);
        this.updateShareState = this.updateShareState.bind(this);
    }

    showDelModal = (evt) => {
        this.setState({showDeleteModal: true});
    }
    hideDelModal = (evt) => {
        this.setState({showDeleteModal: false})
    }

    refreshPage = (evt) => {
        this.setState({ refresh : true });
    }

    sharePublic = (evt) => {
        this.setState({ public: !this.state.public }, () => {
            if (this.state.public) {
                // Add to public list
                fetch(`http://localhost:3001/public-puzzles?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, 
                {
                    method: "POST",
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded', 
                    }),
                    body: `puzzle_id=${this.props.puzzle_id}&image=${encodeURIComponent(this.props.image)}&tags=${this.props.tags}&name=${this.props.name}`
                }
                ).then(res => console.log(res));
                
                // Update the user's puzzle
                if (this.state.friend) {
                    fetch(`http://localhost:3001/puzzles/${this.props.id}/${this.props.puzzle_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, 
                    {
                        method: "PUT",
                        headers: new Headers({
                            'Content-Type': 'application/x-www-form-urlencoded', 
                        }),
                        body: `personal_puzzle.status=Both`
                    }
                    ).then(res => console.log(res));
                } else {
                    fetch(`http://localhost:3001/puzzles/${this.props.id}/${this.props.puzzle_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, 
                    {
                        method: "PUT",
                        headers: new Headers({
                            'Content-Type': 'application/x-www-form-urlencoded', 
                        }),
                        body: `personal_puzzle.status=Public`
                    }
                    ).then(res => console.log(res));
                }
            } else {
                // Delete from public list
                fetch(`http://localhost:3001/public-puzzles/${this.props.puzzle_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, {
                    method: "DELETE",
                }).then(res => console.log(res))
                .catch(e => console.log(e));

                // Update the user's puzzle
                if (this.state.friend) {
                    fetch(`http://localhost:3001/puzzles/${this.props.id}/${this.props.puzzle_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, 
                    {
                        method: "PUT",
                        headers: new Headers({
                            'Content-Type': 'application/x-www-form-urlencoded', 
                        }),
                        body: `personal_puzzle.status=Shared`
                    }
                    ).then(res => console.log(res));
                } else {
                    fetch(`http://localhost:3001/puzzles/${this.props.id}/${this.props.puzzle_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, 
                    {
                        method: "PUT",
                        headers: new Headers({
                            'Content-Type': 'application/x-www-form-urlencoded', 
                        }),
                        body: `personal_puzzle.status=Personal`
                    }
                    ).then(res => console.log(res));
                }
            }

            this.updateShareState();
        });
    }
    shareFriend = (evt) => {
        this.setState({ friend: !this.state.friend }, () => {
            if (this.state.friend) {
                // Create puzzle for friends
                this.props.friend_list.forEach(id => {
                    fetch(`http://localhost:3001/puzzles?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, 
                    {
                        method: "POST",
                        headers: new Headers({
                            'Content-Type': 'application/x-www-form-urlencoded', 
                        }),
                        body: `account_id=${id}&personal_puzzle.status=Shared&shared_puzzle.image=${encodeURIComponent(this.props.image)}&shared_puzzle.tags=${this.props.tags}&shared_puzzle.name=${this.props.name}`
                    }
                    ).then(res => console.log(res)).catch(e => console.log(e));
                });
                
                // Update the user's puzzle share status
                fetch(`http://localhost:3001/puzzles/${this.props.id}/${this.props.puzzle_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, 
                {
                    method: "PUT",
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded', 
                    }),
                    body: `personal_puzzle.status=Shared`
                }
                ).then(res => console.log(res));
            } else {
                // Delete puzzle from the friend's view
                this.props.friend_list.forEach(id => {
                    fetch(`http://localhost:3001/puzzles/${id}/shared/${this.props.name}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, 
                    {
                        method: "DELETE",
                    }
                    ).then(res => console.log(res)).catch(e => console.log(e));
                });

                // Updates the user's puzzle share status
                // Checks if the puzzle is publically shared
                if (this.state.public) {
                    fetch(`http://localhost:3001/puzzles/${this.props.id}/${this.props.puzzle_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, 
                    {
                        method: "PUT",
                        headers: new Headers({
                            'Content-Type': 'application/x-www-form-urlencoded', 
                        }),
                        body: `personal_puzzle.status=Public`
                    }
                    ).then(res => console.log(res));
                } else {
                    fetch(`http://localhost:3001/puzzles/${this.props.id}/${this.props.puzzle_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, 
                    {
                        method: "PUT",
                        headers: new Headers({
                            'Content-Type': 'application/x-www-form-urlencoded', 
                        }),
                        body: `personal_puzzle.status=Personal`
                    }
                    ).then(res => console.log(res));
                }
            }

            this.updateShareState();
        });
    }

    updateShareState = () => {
        if (this.state.public && this.state.friend) {
            // Change user's puzzle share status to BOTH
            fetch(`http://localhost:3001/puzzles/${this.props.id}/${this.props.puzzle_id}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495`, 
            {
                method: "PUT",
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', 
                }),
                body: `personal_puzzle.status=Both`
            }
            ).then(res => console.log(res));
        }
    }

    render() {
        let publicShareButton;
        let friendShareButton;
        let sharedMessage;
        let submitButton;
        let deleteButton;

        if (this.props.neither) {
            sharedMessage = <p><strong>This is a shared puzzle.</strong></p>

            publicShareButton = <input disabled type='checkbox' id='publicShare' 
            name='publicShare' value='Public' defaultChecked={this.state.public}/>
        
            friendShareButton = <input disabled type='checkbox' id='friendShare' 
            name='friendShare' value='Shared' defaultChecked={this.state.friend}/>
        } else {
            publicShareButton = <input type='checkbox' id='publicShare' 
            name='publicShare' value='Public' checked={this.state.public}
            onChange={this.sharePublic}/>
        
            friendShareButton = <input type='checkbox' id='friendShare' 
            name='friendShare' value='Shared' checked={this.state.friend}
            onChange={this.shareFriend}/>

            deleteButton = <div id='update-share'
            onClick={evt => this.showDelModal(evt)}>
                Delete Me?
            </div>
        }

        let data = [
            {
                image: this.props.image,
                name: this.props.name
            }
        ]

        return(
            <div id='medium-puzzle-view'>
                    <div id='puzzle-view'>
                        <Link className='link' to={{
                            pathname: '/puzzle',
                            data: data
                        }}>
                            <img src={this.props.image} alt='Link is Broken'/>
                        </Link>
                        <span className='tag_holder'>
                            {this.props.tags}
                        </span>
                        <h2 className='small-puzzle-view title'>
                            {this.props.name}
                        </h2>
                    </div>
                    <div id='sharing-view'>
                        <form id='sharing-form'>
        
                            <input readOnly type='image' name='image' value='' src={this.props.image}
                            alt='Missing'
                            style={{display:'none'}}/>
                            <input readOnly type='text' name='title' value={this.props.name}
                            style={{display:'none'}}/>
                            <input readOnly type='text' name='tags' value={this.props.tags}
                            style={{display:'none'}}/>

                            { sharedMessage }
                            <label htmlFor='publicShare'>public</label>
                            { publicShareButton }
                            <br />
                            <label htmlFor='friendShare'>friends</label>
                            { friendShareButton }
                            <br />
        
                            { submitButton }
                            <br/>
                            { deleteButton }
                        </form>
                    </div>
                    <DeletePuzzle id={this.props.id}
                    name={this.props.name}
                    image={this.props.image}
                    puzzle_id={this.props.puzzle_id}
                    shared={this.props.friendsShared}
                    show={this.state.showDeleteModal} 
                    handleClose={ evt => this.hideDelModal(evt) }/>
                </div>
        );
    }
}

export default MediumPuzzleView;