import React from 'react';
import Button from './button';

const Header = props => {
    return(
        <>
            <div id='left-header'>
                <a href='/'>
                    <img id='logo' src="placeholder_logo.png" alt='Link is Broken'/>
                </a>
            </div>
            <div id='middle-header'>
                {props.goBackHome}
            </div>
            <div id='right-header'>
                <Button redirect={props.redirect} pageName={props.pageName}/>
            </div>
        </>
    )
}

export default Header;