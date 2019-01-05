import React, { Component } from 'react';

import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(){
  super();
  const params = this.getHashParams();
  const token = params.access_token;
  this.state = {
    loggedIn: token ? true : false,
    nowPlaying: { name: '', 
    image: '' 
  }
  }

  
  if (token) {
    spotifyWebApi.setAccessToken(token);
  }

}

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              image: response.item.album.images[0].url
            }
        });
      })
  }

  render() {
    return (
      <div className="App">
      <a href='http://localhost:8888'> 
      <button>Login With Spotify</button>
      </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.image} style={{ width: 100 }}/>
        </div>
       
          <button onClick={() => this.getNowPlaying()}>
            Check what's Now Playing
          </button>
        
      </div>
    );
  }
}

export default App;



