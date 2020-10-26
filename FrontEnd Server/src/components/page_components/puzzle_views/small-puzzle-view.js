import React from 'react';

const SmallPuzzleView = props => {
    return(
        <div id='small-puzzle-view'>
            <img src={props.image} alt='Link is Broken'/>
            <span className='tag_holder'>
                {props.tags}
            </span>
            <h2 className='small-puzzle-view title'>
                {props.title}
            </h2>
        </div>
    );
}

export default SmallPuzzleView;