import React from 'react';
import Card from './Card.js';
import './App.css';
import './PlaylistCard.css';

class PlaylistCard extends React.Component {
  render() {
    let playlist = JSON.parse(localStorage.getItem('tracks'));
    return (
      <section className="playlist-section">
        {playlist.map((track, index) => 
          <Card data-id={track.id} key={index}>
          <h1 className="track-title">{track.title}</h1>
          <iframe src={track.url} title={track.title} width="240px"></iframe>
          </Card>
        )}
      </section>
    );
  }
}

export default PlaylistCard;