import React, { Component } from 'react';
import Header from './page_components/header';
import Footer from './page_components/footer';

import Draggable, {DraggableCore} from 'react-draggable';

class PuzzlePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            copyright: 'Copyright Dery Germann 2020',
            gbh: <a href='puzzle' id='go-back-home-button'><p>&#8592; Go Back To Your Account</p></a>,
            img_width: 0,
            img_height: 0,
            window_width: window.innerWidth,
        };
    }

    handleResize = (evt) => {
        this.setState({ window_width: window.innerWidth });
    };
    
    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }
    
    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize);
    } 

    render() {

        const { data } = this.props.location

        let puzzle_grid = [];
        let puzzle_column = [];
        let drag_items = [];
        let height_scale = 1;
        let width_scale = 1;

        let img = document.createElement('img');
        img.src = data[0].image;
        // Scales the image down if width or height is too big.
        if (img.width > 1000 || img.height > 1000) {
            height_scale = 0.5;
            width_scale = 0.5;
        }

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = img.width * width_scale
        canvas.height = img.height * height_scale
        ctx.drawImage(img, 0, 0, img.width * width_scale, img.height * height_scale);

        // console.log(canvas.width);
        // console.log(canvas.height);
        console.log(this.state.window_width);

        // Create 25 divs with set styling and outlines
        for (let y = 0; y < 5; y++){
            puzzle_column = [];
            for (let x = 0; x < 5; x++) {
                puzzle_column.push(<div key={`${y},${x}`} style={
                    {
                        border: '1px solid black',
                        maxHeight: canvas.height/5,
                        minHeight: canvas.height/5
                    }
                }></div>);
            }
            puzzle_grid.push(<div key={y} style={
                { 
                    minWidth:canvas.width/5, 
                    maxWidth:canvas.width/5, 
                }
            }>{ puzzle_column }</div>);      
        }

        // Create the 25 drag elements

        return (
            <div id='pageContent'>
                <div id='header'>
                    <Header 
                        redirect='signup' 
                        pageName='Log Out' 
                        goBackHome={this.state.gbh}
                    />
                </div>
                <div id='content'>
                    <h2>{data[0].name}</h2>

                    <div id='puzzle-view'>
                        <div id='left-puzzle'>
                            <Draggable bounds={{top: -65}}>
                                <div className='button'>Something</div>
                            </Draggable>
                        </div>
                        <div id='puzzle-outline'>
                            { puzzle_grid }
                        </div>
                        <div id='right-puzzle'>
                            <img src={canvas.toDataURL()}/>
                        </div>
                    </div>
                </div>
                <div id='footer'>
                    <Footer copyright={this.state.copyright} />
                </div>
            </div>
        );
    }
}

export default PuzzlePage;