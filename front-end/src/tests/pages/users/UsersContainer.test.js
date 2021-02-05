import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import 'whatwg-fetch';

import UsersContainer from '../../../pages/users/UsersContainer';

describe('render <UsersContainer>', () => {
  beforeEach(() => {
    const expected = {
      users: [{ name: 'test', id: 'id', places: [], image: 'image' }],
    };
    jest.spyOn(window, 'fetch').mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(expected),
      };
      return Promise.resolve(fetchResponse);
    });
  });
  it('should render user list', async () => {
    const { container } = render(
      <BrowserRouter>
        <UsersContainer />
      </BrowserRouter>,
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
