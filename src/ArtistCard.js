import React from 'react';
import Card from './Card.js';
import './ArtistCard.css';
import PropTypes from 'prop-types';

function ArtistTrack(props) {
  return (
    <li>
      {props.title}
      <br/>
      <iframe src={props.url} title={props.title} width="240px"></iframe>
    </li>
  )
}

ArtistTrack.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

class ArtistCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tracks: [] }
    this.getArtistTracks = this.getArtistTracks.bind(this);
  }

  getArtistTracks(event) {
    const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com';
    const options = {
      method: 'get',
      credentials: 'include',
    };

    fetch(`${BASE_URL}/artists/${this.props.id}/tracks`, options)
    .then(res => res.json())
    .then (data => {
      this.setState({ tracks: data })
    });
  }

  render() {
    return (
      <Card>
        <h1 className="artist-name">{this.props.name}</h1>
        <h2 className="artist-genre">Genre: {this.props.genre}</h2>
        <button className="btn-artist-card" onClick={this.getArtistTracks}>GET TRACKS</button>
        <ul>
          {this.state.tracks.map((track, index) => <ArtistTrack key={index} {...track}/>)}
        </ul>
      </Card>
    );
  }
}

ArtistCard.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};

export default ArtistCard;