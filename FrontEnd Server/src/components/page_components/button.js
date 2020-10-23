import React from 'react';

const Button = props => {
    return(
        <a href={props.redirect}>
            <div className='button'>
                {props.pageName}
            </div>
        </a>
    )
}

export default Button;