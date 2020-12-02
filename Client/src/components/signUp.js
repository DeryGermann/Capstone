import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

import Header from './page_components/header';
import Footer from './page_components/footer';
import { Redirect } from 'react-router-dom';

class SignUpPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            copyright: 'Copyright Dery Germann 2020',
            gbh: <a href='/' id='go-back-home-button'><p>&#8592; Go Back Home</p></a>,
            users: [],
            isNewUser: true,
            redirect: false,
        }

        this.responseGoogle = this.responseGoogle.bind(this);
    }

    componentDidMount = () => {
        fetch('http://localhost:3001/accounts/listall?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495', {
            method: "GET",
        })
        .then(res => res.json())
        .then(result => this.setState({ users: result }))
        .catch(e => console.log(e));
    }

    responseGoogle = (response) => {
        let loggedin_user;

        this.state.users.forEach(user => {
            // if (user.email === response.profileObj.email) {
            //     this.setState({ isNewUser: false });
            //     loggedin_user = user;
            // } else {
            //     loggedin_user = user;
            // }


            if (user.email === "terer@gmail.com") {
                this.setState({ isNewUser: false });
                loggedin_user = user;
            }
        });
        
        if (this.state.isNewUser) {
            let split_name = response.profileObj.name.split(" ");
            let email = response.profileObj.email

            fetch('http://localhost:3001/accounts?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495', 
                {
                    method: "POST",
                    headers: new Headers({
                        'Content-Type': 'application/x-www-form-urlencoded', 
                    }),
                    body: `firstName=${split_name[0]}&lastName=${split_name[1]}&email=${email}`
                }
            )
            .then(res => res.json())
            .then(user => sessionStorage.setItem('user', JSON.stringify(user)))
            .then(this.setState({ redirect: true }))
            .catch(e => console.log(e));
        } else {
            this.setState({ redirect: true }, () => {
                sessionStorage.setItem('user', JSON.stringify(loggedin_user));
            });
        }
    }

    render() {
        let page_header = <h1>Log In</h1>;

        let google_login = <GoogleLogin
            clientId="301198402381-q3tdlo01usj267dlq1anlejh2oj2qcav.apps.googleusercontent.com"
            buttonText="Login Using Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
        />;

        if (this.state.redirect || sessionStorage.getItem('user')) {
            page_header = <a href='account'><u><h1>Visit Your Account Page</h1></u></a>;

            google_login = <p></p>;
        }

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
                        { page_header }
                        { google_login }
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