import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

import Header from './page_components/header';
import Footer from './page_components/footer';

class SignUpPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            copyright: 'Copyright Dery Germann 2020',
            gbh: <a href='/' id='go-back-home-button'><p>&#8592; Go Back Home</p></a>
        }

        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle = (response) => {
        console.log(response);
    }

    render() {
        return (
            <div id='pageContent'>
                <div id='header'>
                    <Header 
                        redirect='signup' 
                        pageName='Log In' 
                        goBackHome={this.state.gbh}
                    />
                </div>
                <div id='content'>
                    <div id='sign-up'>
                        <h1>Sign In</h1>
                        
                        <GoogleLogin
                            clientId="301198402381-q3tdlo01usj267dlq1anlejh2oj2qcav.apps.googleusercontent.com"
                            buttonText="Sign Up"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
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