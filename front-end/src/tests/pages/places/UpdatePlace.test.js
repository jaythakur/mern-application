import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';

import UpdatePlace from '../../../pages/places/UpdatePlace';
import history from '../../../shared/utils/history';

describe('Test <UpdatePlace> component', () => {
  it('should render component without place id', () => {
    const url = '/places/';
    history.push(url);
    render(
      <Router history={history}>
        <Route path="/places/">
          <UpdatePlace />
        </Route>
      </Router>,
    );
    expect(screen.getByText('Could not found place.')).toBeDefined();
  });
});

describe('Test <UpdatePlace> component', () => {
  it('should render component with place id', () => {
    const url = '/places/p1';
    history.push(url);
    render(
      <Router history={history}>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
      </Router>,
    );
    expect(screen.getByRole('button').hasAttribute('disabled')).toBe(false);
  });
  it('should submit form onsubmit', () => {
    const url = '/places/p1';
    history.push(url);
    render(
      <Router history={history}>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
      </Router>,
    );
    fireEvent.submit(screen.getByRole('button'));
  });
});
