import React, { Component } from 'react';
import Header from './page_components/header';
import Footer from './page_components/footer';

class SignUpPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            copyright: 'Copyright Dery Germann 2020',
            gbh: <a href='/' id='go-back-home-button'><p>&#8592; Go Back Home</p></a>
        }
    }

    render() {
        return (
            <div id='pageContent'>
                <div id='header'>
                    <Header 
                        redirect='signup' 
                        pageName='Sign Up' 
                        goBackHome={this.state.gbh}
                    />
                </div>
                <div id='content'>
                <div id='brief-overview'>
                        <h1 id='page-header'>SignUp</h1>
                        <p id='page-text'>
                            Will be implemented later
                        </p>
                    </div>
                </div>
                <div id='footer'>
                    <Footer copyright={this.state.copyright} />
                </div>
            </div>
        );
    }
}

export default SignUpPage;