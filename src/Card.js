import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';
import {CardPanel} from 'react-materialize';

function Card(props) {
  return (
    <CardPanel className="cards white black-text">
      {props.children}
    </CardPanel> 
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired
};

export default Card;