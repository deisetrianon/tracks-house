import React from 'react';
import Card from './Card.js';
import './TrackCard.css';
import {Icon} from 'react-materialize';

let tracksPlaylist = [];

class TrackCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      tracks: []
    }
    this.addPlaylistButton = this.addPlaylistButton.bind(this)
  }

  componentDidMount() {
    const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com';
    const options = {
      method: 'get',
      credentials: 'include',
    };

    fetch(`${BASE_URL}/tracks`, options)
    .then(res => res.json())
    .then (data => {
      this.setState({ tracks: data })
    });
  }

  addPlaylistButton(track) {
    let playlist = JSON.parse(localStorage.getItem('tracks'));
    if (!playlist.some(item => item.id === track.id)) {
      tracksPlaylist.push(track);
      localStorage.setItem('tracks', JSON.stringify(tracksPlaylist));
    }
  }

  render() {
    return (
      <section className="tracks-section">
        {this.state.tracks.map((track, index) =>
          <Card data-id={track.id} key={index}>
            <h1 className="track-title">{track.title}</h1>
            <iframe src={track.url} title={track.title} width="240px"></iframe>
            <br/>
            <button className="btn-track-card" onClick={() => this.addPlaylistButton(track)}><Icon left>add</Icon>Add to my playlist</button>
          </Card>
        )}
      </section>
    );
  }
}

export default TrackCard;