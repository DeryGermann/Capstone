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
        sessionStorage.removeItem("image");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("height");
        sessionStorage.removeItem("width");

        // Will Read from the API and populate a variable
        this.getPublicData();
        
        // this.test_populate();
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

    getPublicData() {
        fetch('http://localhost:3001/public-puzzles?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495', {
            method: "GET",
        })
        .then(res => res.json())
        .then(result => this.setState({public_info : result}))
        .catch(e => console.log(e));
    }

    updateSearchValue(evt) {
        this.setState({searchValue: evt.target.value});
    }

    render() {
        let header = <Header 
                        redirect='signup' 
                        pageName='Sign Up' 
                        goBackHome={this.state.gbh}
                    />;

        let redirect = "signup";
        let pageName = 'Sign Up to Start Creating Puzzles Now!';

        if (sessionStorage.getItem('user')) {
            header = <Header 
                        redirect='signup' 
                        pageName='Log Out' 
                        goBackHome={this.state.gbh}
                    />;

            redirect = "account";
            pageName = 'View your puzzles!'
        }

        return (
            <div id='pageContent'>
                <div id='header'>
                    { header }
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
                            this.state.public_info
                            // Filters by name or tags
                            .filter(view => view.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) 
                            || view.tags.toLowerCase().includes(this.state.searchValue.toLowerCase()))
                            .map((view, i) => {
                                return(<SmallPuzzleView 
                                    key={i}
                                    puzzleId={view.puzzle_id}
                                    image={view.image}
                                    tags={view.tags}
                                    name={view.name}/>)
                            })
                        }
                    </div>

                    <div id='home-page-button'>
                        <Button id='important_button' redirect={redirect} pageName={pageName}/>
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