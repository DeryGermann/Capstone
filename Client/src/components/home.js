import React, { Component } from 'react';
import Header from './page_components/header';
import Footer from './page_components/footer';

import Button from './page_components/button';

class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            copyright: 'Copyright Dery Germann 2020',
        }
    }

    render() {
        return (
            <div id='pageContent'>
                <div id='header'>
                    <Header 
                        redirect='signup' 
                        pageName='Sign Up' 
                        goBackhome=''
                    />
                </div>
                <div id='content'>
                    <div id='brief-overview'>
                        <h1 id='home-page-header'>Overview</h1>
                        <p id='home-page-text'>
                            Do you remember solving jigsaw puzzles with your parents and/or
                            your grandparents?
                            <br />
                            I do.
                            <br />
                            Now I want to be able to allow people from different sides of the world
                            to be able to send each other jigsaw puzzles using images from the internet
                            or any image that they currently own.
                        </p>
                    </div>

                    <div id='home-page-button'>
                        <Button redirect='public' pageName='Start Browsing Jigsaw Puzzles'/>
                    </div>
                </div>
                <div id='footer'>
                    <Footer copyright={this.state.copyright} />
                </div>
            </div>
        );
    }
}

export default HomePage;