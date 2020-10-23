import React, { Component } from 'react';
import './App.css';
import ButtonComponent from './buttonComponent';

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    sources: [],
    api_key: 'ab54c008f1ff443a9fa366f2879ebdf0'
  }

  componentDidMount() {
    fetch(`http://newsapi.org/v2/top-headlines?country=us&apiKey=${this.state.api_key}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        sources: data.articles
      });
    });
  }

  onSelectNewsSource(evt) {
    fetch(`http://newsapi.org/v2/top-headlines?sources=${evt.target.value}&apiKey=${this.state.api_key}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        sources: data.articles
      });
    });
  }

  render() {
    return(
      <>
        <header>
          <div class='headerContent'>
            <div id='leftHeaderContent'>
              <img id='headerLogo' src='logo.png' alt='' />
            </div>
            <div id='rightHeaderContent'>
              <ButtonComponent name='Fox News' onSelectNewsSource={ evt => this.onSelectNewsSource(evt) } source='fox-news'/>
              <ButtonComponent name='The Wall Street Journal' onSelectNewsSource={ evt => this.onSelectNewsSource(evt) } source='the-wall-street-journal'/>
              <ButtonComponent name='CNN' onSelectNewsSource={ evt => this.onSelectNewsSource(evt) } source='cnn'/>
              <ButtonComponent name='The Washington Post' onSelectNewsSource={ evt => this.onSelectNewsSource(evt) } source='the-washington-post'/>
              <ButtonComponent name='The Verge' onSelectNewsSource={ evt => this.onSelectNewsSource(evt) } source='the-verge'/>
              <ButtonComponent name='CBS News' onSelectNewsSource={ evt => this.onSelectNewsSource(evt) } source='nbc-news'/>
              <ButtonComponent name='Fox News' onSelectNewsSource={ evt => this.onSelectNewsSource(evt) } source='cbs-news'/>
              <ButtonComponent name='USA Today' onSelectNewsSource={ evt => this.onSelectNewsSource(evt) } source='usa-today'/>
              <ButtonComponent name='TechCrunch' onSelectNewsSource={ evt => this.onSelectNewsSource(evt) } source='techcrunch'/>
              <ButtonComponent name='Engadget' onSelectNewsSource={ evt => this.onSelectNewsSource(evt) } source='engadget'/>
            </div>
          </div>
        </header>

        <div class='contentHolder'>
          { 
            this.state.sources
            .map(source => (
              <>
                <div class='content'>
                  <h1><a target='_blank' href={ source.url } >{ source.title }</a></h1>
                  <h2>{ source.author }</h2>
                  <p>{ source.description }</p>
                  <a target='_blank' href={ source.url } ><img src={ source.urlToImage } alt="" /></a>
                </div>
              </>
            )) 
          }
        </div>
      </>
    );
  }
}

export default App;
