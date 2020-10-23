import React, { Component } from 'react';
import Header from './page_components/header';
import Footer from './page_components/footer';

class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            copyright: 'Copyright Dery Germann 2020'
        }
    }

    render() {
        return (
            <div id='pageContent'>
                <div id='header'>
                    <Header redirect='signup' pageName='Sign Up' />
                </div>
                <div id='overview'>
                    <div>
                        stuff
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