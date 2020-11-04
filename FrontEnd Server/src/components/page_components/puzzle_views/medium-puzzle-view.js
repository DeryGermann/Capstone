import React, { Component } from 'react';

import DeletePuzzle from '../modals/deletePuzzle-modal';


class MediumPuzzleView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDeleteModal: false,
            refresh: false,
        }
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

    render() {
        let publicShareButton;
        let friendShareButton;
        let sharedMessage;
        let submitButton;
        let deleteButton;

        if (this.props.neither) {
            sharedMessage = <p><strong>This is a shared puzzle.</strong></p>

            publicShareButton = <input disabled type='checkbox' id='publicShare' 
            name='publicShare' value='Public' defaultChecked={this.props.publicallyShared}/>
        
            friendShareButton = <input disabled type='checkbox' id='friendShare' 
            name='friendShare' value='Shared' defaultChecked={this.props.friendsShared}/>
        } else {
            publicShareButton = <input type='checkbox' id='publicShare' 
            name='publicShare' value='Public' defaultChecked={this.props.publicallyShared}/>
        
            friendShareButton = <input type='checkbox' id='friendShare' 
            name='friendShare' value='Shared' defaultChecked={this.props.friendsShared}/>

            submitButton = <input type='submit' value='Update Share Settings' id='update-share'
            onClick={evt => this.refreshPage(evt)}/>

            deleteButton = <div id='update-share'
            onClick={evt => this.showDelModal(evt)}>
                Delete Me?
            </div>
        }


        return(
            <div id='medium-puzzle-view'>
                <div id='puzzle-view'>
                    <img src={this.props.image} alt='Link is Broken'/>
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