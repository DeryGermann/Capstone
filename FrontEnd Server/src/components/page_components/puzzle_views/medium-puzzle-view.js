import React from 'react';

const MediumPuzzleView = props => {

    let publicShareButton= <input type='checkbox' id='publicShare' 
    name='publicShare' value='Public' checked={props.publicallyShared}
    onChange={props.publicChange.bind(this)}/>

    let friendShareButton= <input type='checkbox' id='friendShare' 
    name='friendShare' value='Shared' checked={props.friendsShared}
    onChange={props.friendChange.bind(this)}/>

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
                <label htmlFor='publicShare'>Share w/ the Public</label>
                { publicShareButton }
                <br />
                <label htmlFor='friendShare'>Share w/ Your Friends</label>
                { friendShareButton }
                <br />
            </div>
        </div>
    );
}

export default MediumPuzzleView;