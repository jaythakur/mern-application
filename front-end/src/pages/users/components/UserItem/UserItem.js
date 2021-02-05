import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Avatar } from '../../../../shared/components';
import './UserItem.scss';

const UserItem = (props) => (
  <li className="user-item">
    <Card className="user-item__content">
      <Card.Body>
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar src={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card.Body>
    </Card>
  </li>
);

UserItem.defaultProps = {
  name: '',
};

UserItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
  placeCount: PropTypes.number.isRequired,
};

export default UserItem;
