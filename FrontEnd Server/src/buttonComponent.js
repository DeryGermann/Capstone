import React, { Component } from 'react';

const ButtonComponent = props => {
    return (
        <>
            <button onClick={ props.onSelectNewsSource } 
            value={ props.source } >
                { props.name }
            </button>
        </>
    )
}

export default ButtonComponent;