import { Link } from 'react-router-dom';
import React from 'react';

const SmallPuzzleView = props => {
    let data = [
        {
            image: props.image,
            name: props.name
        }
    ]

    return(
        <div id='small-puzzle-view'>
            <Link className='link' to={{
                pathname: '/public-puzzle',
                data: data
            }}>
                <img src={props.image} alt='Link is Broken'/>
            </Link>
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