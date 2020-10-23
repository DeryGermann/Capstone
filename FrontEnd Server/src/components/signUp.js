import React, { Component } from 'react';

class SignUpPage extends Component {
    constructor(props){
        super(props);
    }

    onChange(evt) {
        this.setState({
            apikey: evt.target.value
        });
    }

    loadAllRecords(evt) {
        fetch(`http://localhost:3001/records?apikey=${this.state.apikey}`)
        .then(response => response.json())
        .then(data => {
            this.setState({ results: data });
        });
    }

    updateRecord(id) {
        fetch(`http://localhost:3001/records/${id}?apikey=${this.state.apikey}`, {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', 
            }),
            body: `gameResult=${this.state.gameResult}&champion=${this.state.champion}&username=${this.state.username}`
        })
        .then(this.loadAllRecords());
    }

    deleteRecord(id) {
        fetch(`http://localhost:3001/records/${id}?apikey=${this.state.apikey}`, {
            method: "DELETE"
        })
        .then(this.loadAllRecords());
    }

    createNewRecord(evt) {
        fetch(`http://localhost:3001/records?apikey=${this.state.apikey}`, {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded', 
                }),
                body: `gameResult=${this.state.newGameResult}&champion=${this.state.newChampion}&username=${this.state.newUsername}`
        })
        .then(res => console.log(res.json()))
        .then(this.loadAllRecords());
    }

    render() {
        return (
            <>
                <p>Enter your API Key to see all the records!</p>

                <input type='text' value={ this.state.apikey } 
                onChange={ this.onChange.bind(this) } 
                placeholder='Enter your API Key...'/>

                <button onClick={ this.loadAllRecords.bind(this) } >Submit</button>

                <br/>
                <br/>
                <br/>

                <h1>Create a new record BUT you need to submit your API Key first!</h1>
                <label>Game Result: </label>
                <input type='text' defaultValue={ this.state.newGameResult } 
                    onChange={ evt => this.setState({ newGameResult: evt.target.value }) }
                />
                <br/>
                <label>Username: </label>
                <input type='text' defaultValue={ this.state.newUsername } 
                    onChange={ evt => this.setState({ newUsername: evt.target.value }) }
                />
                <br/>
                <label>Champion: </label>
                <input type='text' defaultValue={ this.state.newChampion } 
                    onChange={ evt => this.setState({ newChampion: evt.target.value }) }
                />
                <br/>

                <button onClick={ this.createNewRecord.bind(this) } >Create New Record</button>

                <h1>All API Records</h1>
                {
                    this.state.results.map(record => (
                    <>
                        <input type='text' defaultValue={ record.gameResult } 
                            onChange={ evt => this.setState({ gameResult: evt.target.value }) }
                        />
                        <input type='text' defaultValue={ record.username } 
                            onChange={ evt => this.setState({ username: evt.target.value }) }
                        />
                        <input type='text' defaultValue={ record.champion } 
                            onChange={ evt => this.setState({ champion: evt.target.value }) }
                        />

                        <button onClick={ this.updateRecord.bind(this, record._id) } >Push Change</button>
                        <button onClick={ this.deleteRecord.bind(this, record._id) } >Delete Record</button>
                        <br/>
                        <br/>
                        <br/>
                     </>   
                    ))
                }
            </>
        );
    }
}

export default SignUpPage;