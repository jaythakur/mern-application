import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';

import UserPlaces from '../../../pages/places/UserPlaces';
import history from '../../../shared/utils/history';

describe('Test <UserPlaces> component', () => {
  beforeEach(() => {
    const expected = {
      places: [
        {
          title: 'test',
          description: 'description',
          address: 'address',
          image: 'image',
        },
      ],
    };
    jest.spyOn(window, 'fetch').mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(expected),
      };
      return Promise.resolve(fetchResponse);
    });
  });
  it('should render component with user id', async () => {
    const url = '/u1/places';
    history.push(url);
    const { container } = render(
      <Router history={history}>
        <Route path="/:userId/places">
          <UserPlaces />
        </Route>
      </Router>,
    );
    expect(
      container.querySelector('.loading-spinner__overlay'),
    ).toBeInTheDocument();
    await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
    expect(
      container.querySelector('.loading-spinner__overlay'),
    ).not.toBeInTheDocument();
    const returnedAbilities = await screen.findAllByRole('listitem');
    expect(returnedAbilities).toHaveLength(1);
  });
});
