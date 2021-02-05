import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';

import UserPlaces from '../../../pages/places/UserPlaces';
import history from '../../../shared/utils/history';

describe('Test <UserPlaces> component', () => {
  it('should render component with user id', () => {
    const url = '/u1/places';
    history.push(url);
    render(
      <Router history={history}>
        <Route path="/:userId/places">
          <UserPlaces />
        </Route>
      </Router>,
    );
    expect(screen.getAllByRole('listitem')).toBeDefined();
  });
});
