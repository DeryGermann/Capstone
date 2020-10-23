import React, { Component } from 'react';
import Button from './button';

const Header = props => {
    return(
        <>
            <div id='left-header'>
                <img id='logo' src='placeholder_logo.png' />
            </div>
            <div id='middle-header'>

            </div>
            <div id='right-header'>
                <Button redirect={props.redirect} pageName={props.pageName}/>
            </div>
        </>
    )
}

export default Header;