import React from 'react';

const Button = props => {
    return(
        <a href={props.redirect} onClick={() => {
            if (props.pageName === "Log Out") {
                sessionStorage.removeItem("user");
            }
        }}>
            <div id={props.id} className='button'>
                {props.pageName}
            </div>
        </a>
    )
}

export default Button;