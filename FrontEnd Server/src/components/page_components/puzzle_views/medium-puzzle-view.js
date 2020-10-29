import React from 'react';

const MediumPuzzleView = props => {

    let publicShareButton = <input type='checkbox' id='publicShare' 
    name='publicShare' value='Public' defaultChecked={props.publicallyShared}/>

    let friendShareButton = <input type='checkbox' id='friendShare' 
    name='friendShare' value='Shared' defaultChecked={props.friendsShared}/>

    return(
        <div id='medium-puzzle-view'>
            <div id='puzzle-view'>
                <img src={props.image} alt='Link is Broken'/>
                <span className='tag_holder'>
                    {props.tags}
                </span>
                <h2 className='small-puzzle-view title'>
                    {props.title}
                </h2>
            </div>
            <div id='sharing-view'>
                <form id='sharing-form'>

                    <input readOnly type='image' name='image' value='' src={props.image}
                    alt='Missing'
                    style={{display:'none'}}/>
                    <input readOnly type='text' name='title' value={props.title}
                    style={{display:'none'}}/>
                    <input readOnly type='text' name='tags' value={props.tags}
                    style={{display:'none'}}/>

                    <label htmlFor='publicShare'>public</label>
                    { publicShareButton }
                    <br />
                    <label htmlFor='friendShare'>friends</label>
                    { friendShareButton }
                    <br />

                    <input type='submit' value='Update Share Settings' id='update-share'/>
                </form>
            </div>
        </div>
    );
}

export default MediumPuzzleView;