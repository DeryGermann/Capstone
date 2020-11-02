import React from 'react';

const SmallPuzzleView = props => {
    return(
        <div id='small-puzzle-view'>
            <img src={`data:image/png;base64,${props.image}`} alt='Link is Broken'/>
            <span className='tag_holder'>
                {props.tags}
            </span>
            <span className='tag_holder'>
                {props.puzzleId}
            </span>
            <h2 className='small-puzzle-view title'>
                {props.name}
            </h2>
        </div>
    );
}

export default SmallPuzzleView;