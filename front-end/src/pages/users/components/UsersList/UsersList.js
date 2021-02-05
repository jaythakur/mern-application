import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../../shared/components/UIElements/Card';
import UserItem from '../UserItem';
import './UsersList.scss';

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="d-flex justify-content-center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};

UsersList.defaultProps = {};

UsersList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default UsersList;
