import React, { Component } from 'react';
import Header from './page_components/header';
import Footer from './page_components/footer';
import Button from './page_components/button';

import SmallPuzzleView from './page_components/puzzle_views/small-puzzle-view';

class PublicPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            copyright: 'Copyright Dery Germann 2020',
            gbh: <a href='/' id='go-back-home-button'><p>&#8592; Go Back Home</p></a>,
            public_info: [],
            searchValue: "",
        }

        this.updateSearchValue = this.updateSearchValue.bind(this);
    }

    componentDidMount() {
        // Will Read from the API and populate a variable
        this.test_populate();
    }

    test_populate() {
        let test_l = [];
        for (let index = 1; index < 11; index++) {
            let test = {};

            test.image = `./test_images/image${index}.png`;
            test.tags = `#cool #reallycool #supercool`;
            test.title = `Test Image ${index}`;

            test_l.push(test);
        }

        this.setState({public_info: test_l});
    }

    updateSearchValue(evt) {
        this.setState({searchValue: evt.target.value});

        console.log(this.state.searchValue);
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
                    <h1>
                        Public Jigsaw Puzzles
                    </h1>
                    <p>
                        This page contains puzzles that users have chosen to
                        make public for anyone to enjoy!
                    </p>

                    <label htmlFor='searchValue'>Search For Puzzles: </label> 
                    <input type='text' 
                    onChange={this.updateSearchValue}
                    id='searchValue'
                    name='searchValue'/>

                    <div id='public-content-holder'>
                        {
                            this.state.public_info.map((view, i) => {
                                return(<SmallPuzzleView 
                                    key={i}
                                    image={view.image}
                                    tags={view.tags}
                                    title={view.title}/>)
                            })
                        }
                    </div>

                    <div id='home-page-button'>
                        <Button id='important_button' redirect='signup' pageName='Sign Up to Start Creating Puzzles Now!'/>
                    </div>
                </div>
                <div id='footer'>
                    <Footer copyright={this.state.copyright} />
                </div>
            </div>
        );
    }
}

export default PublicPage;