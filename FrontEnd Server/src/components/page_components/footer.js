import React, { Component } from 'react';

const Footer = props => {
    return(
        <>
            <div id='left-footer'>
            </div>
            <div id='middle-footer'>
                <p>
                    {props.copyright} &#169;
                </p>
            </div>
            <div id='right-footer'>
            </div>
        </>
    )
}

export default Footer;