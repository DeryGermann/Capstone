import React, { Component } from 'react';

class MediumPuzzleView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let publicShareButton;
        let friendShareButton;
        let sharedMessage;
        let submitButton;

        let image;
        
        const blob = new Blob( [this.props.image] )
        image = URL.createObjectURL(blob);
        console.log(image);

        if (this.props.neither) {
            sharedMessage = <p><strong>This is a shared puzzle.</strong></p>

            publicShareButton = <input disabled type='checkbox' id='publicShare' 
            name='publicShare' value='Public' defaultChecked={this.props.publicallyShared}/>
        
            friendShareButton = <input disabled type='checkbox' id='friendShare' 
            name='friendShare' value='Shared' defaultChecked={this.props.friendsShared}/>

            submitButton = <input disabled type='submit' value='Update Share Settings' id='update-share-disabled'/>
        } else {
            publicShareButton = <input type='checkbox' id='publicShare' 
            name='publicShare' value='Public' defaultChecked={this.props.publicallyShared}/>
        
            friendShareButton = <input type='checkbox' id='friendShare' 
            name='friendShare' value='Shared' defaultChecked={this.props.friendsShared}/>

            submitButton = <input type='submit' value='Update Share Settings' id='update-share'/>
        }


        return(
            <div id='medium-puzzle-view'>
                <div id='puzzle-view'>
                    <img src={image} alt='Link is Broken'/>
                    <span className='tag_holder'>
                        {this.props.tags}
                    </span>
                    <h2 className='small-puzzle-view title'>
                        {this.props.title}
                    </h2>
                </div>
                <div id='sharing-view'>
                    <form id='sharing-form'>
    
                        <input readOnly type='image' name='image' value='' src={this.props.image}
                        alt='Missing'
                        style={{display:'none'}}/>
                        <input readOnly type='text' name='title' value={this.props.title}
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
                    </form>
                </div>
            </div>
        );
    }
}

export default MediumPuzzleView;