import React, { Component } from 'react';
import Header from './page_components/header';
import Footer from './page_components/footer';

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
                            Lorem ipsum dolor sit amet, consectetur adipiscing 
                            elit. Suspendisse commodo, leo sit amet ullamcorper 
                            egestas, arcu nibh tristique augue, ut fermentum 
                            dui risus vitae turpis. Aliquam a condimentum eros. 
                            Donec tortor ipsum, iaculis vel rhoncus ut, vehicula 
                            ac orci. Fusce dictum, augue vel feugiat hendrerit, 
                            risus mi convallis dui, viverra tempus massa lectus 
                            vitae erat. Aenean turpis metus, tincidunt et 
                            scelerisque sit amet, suscipit ac erat. Curabitur 
                            auctor facilisis convallis. Nulla dignissim fringilla 
                            urna, vitae lobortis neque fringilla sed. Mauris non 
                            leo eget enim gravida feugiat vestibulum at nisl. 
                            Cras quis luctus elit, eu tristique diam. In metus 
                            diam, tincidunt sit amet enim vel, lobortis volutpat 
                            lacus. Proin eget viverra felis, nec tempor nisl. 
                            Donec tempor rhoncus euismod.
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

export default HomePage;