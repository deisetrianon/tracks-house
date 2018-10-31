import React, { Component } from 'react';
import './App.css';
import ArtistCard from './ArtistCard';
import TrackCard from './TrackCard';
import PlaylistCard from './PlaylistCard';
import { Route, Link } from 'react-router-dom';

localStorage.setItem('tracks', JSON.stringify([]));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: []
    };
  }

  componentDidMount() {
    const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com';
    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({email: 'api@api.com', password: '123456'})
    };

    fetch(`${BASE_URL}/login`, options)
      .then(res => {
        const options = {
          method: 'get',
          credentials: 'include',
        };
        
        fetch(`${BASE_URL}/artists`, options)
          .then(res => res.json())
          .then (data => this.setState({ artists: data }));
      });   
  }

  render() {
    return (
      <section>
        <div className="header-section">
          <div className="header-image"></div>
          <div className="menu">
            <div className="logo"></div>
            <div className="paths">
              <Link to="/artists" className="menu-button">ARTISTS</Link>
              <Link to="/tracks" className="menu-button-tracks">TRACKS</Link>
              <Link to="/playlist" className="menu-button">MY PLAYLIST</Link>
            </div>
          </div>
        </div>

        <Route exact path="/artists" render={() => 
          <section className="artists-section">
            {this.state.artists.map((artist) => <ArtistCard {...artist} id={artist.id} key={artist.id} />)}
          </section>
        }/>
        <Route exact path="/tracks" component={Tracks}/>
        <Route exact path="/playlist" component={Playlist}/>
      </section>
    );
  }
}

const Tracks = () => {
  return (
    <TrackCard />
  )
}

const Playlist = () => {
  return (
    <PlaylistCard />
  )
}

export default App;
