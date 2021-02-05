import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.scss';
import Button from '../../../shared/components/FormElements/Button/Button';

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem key={place.id} {...place} />
      ))}
    </ul>
  );
};

PlaceList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default PlaceList;
