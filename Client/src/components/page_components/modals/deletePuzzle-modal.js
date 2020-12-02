import React, { Component } from 'react';

class DeletePuzzle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refresh: false
        }

        this.deletePuzzle = this.deletePuzzle.bind(this);
    }

    deletePuzzle() {
        let id = this.props.id;
        let name = this.props.name.replace(" ", "%20").replace(/\+/g, "%2B");
        let puzzle_id = this.props.puzzle_id

        fetch(`http://localhost:3001/puzzles/${id}/personal/${name}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495&imageId=${puzzle_id}`, {
            method: "DELETE",
        }).then(res => console.log(res))
        .catch(e => console.log(e));

        if (this.props.shared) {
            fetch(`http://localhost:3001/puzzles/${id}/shared/${name}?apikey=90e5dc53-ba26-4a92-85b1-9c2375ff1495&imageId=${puzzle_id}`, {
                method: "DELETE",
            }).then(res => console.log(res))
            .then(this.setState({ refresh : true }));
        } else {
            this.setState({
                refresh : true
            });
        }
    }

    render() {
        const showHideClassName = this.props.show ? 
        "delete-modal delete-display-block" : "delete-modal delete-display-none";
      
        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    <span className='close-button topright' 
                    onClick={this.props.handleClose.bind(this)}>&times;</span>
                    <h2>Delete Me?</h2>
                    <div id='delete-view'>
                        <div id='puzzle-view'>
                            <img src={this.props.image} alt='Link is Broken'/>
                            <h2 className='small-puzzle-view title'>
                                {this.props.name}
                            </h2>
                        </div>
                        <div id='sharing-view'>
                            <input id='update-share' type='submit' value='Yes'
                            onClick={this.deletePuzzle}/>
                            <div id='update-share'
                            onClick={this.props.handleClose.bind(this)}>
                                No
                            </div>
                        </div>
                    </div>
                    
                </section>
            </div>
        );
    }
  };

export default DeletePuzzle;