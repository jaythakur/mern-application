import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';

import UpdatePlace from '../../../pages/places/UpdatePlace';
import history from '../../../shared/utils/history';

describe('Test <UpdatePlace> component', () => {
  beforeEach(() => {
    const expected = {
      place: {
        title: 'test',
        description: 'description',
        address: 'address',
        image: 'image',
      },
    };
    jest.spyOn(window, 'fetch').mockImplementation(() => {
      const fetchResponse = {
        ok: true,
        json: () => Promise.resolve(expected),
      };
      return Promise.resolve(fetchResponse);
    });
  });
  it('should render component without place id', async () => {
    const url = '/places/p1';
    history.push(url);
    const { container } = render(
      <Router history={history}>
        <Route path="/places/">
          <UpdatePlace />
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
    expect(screen.getByRole('button').hasAttribute('disabled')).toBe(false);
    fireEvent.submit(screen.getByRole('button'));
  });
});

// describe('Test <UpdatePlace> component', () => {
//   it('should render component with place id', () => {
//     const url = '/places/p1';
//     history.push(url);
//     render(
//       <Router history={history}>
//         <Route path="/places/:placeId">
//           <UpdatePlace />
//         </Route>
//       </Router>,
//     );
//     expect(screen.getByRole('button').hasAttribute('disabled')).toBe(false);
//   });
//   it('should submit form onsubmit', () => {
//     const url = '/places/p1';
//     history.push(url);
//     render(
//       <Router history={history}>
//         <Route path="/places/:placeId">
//           <UpdatePlace />
//         </Route>
//       </Router>,
//     );
//     fireEvent.submit(screen.getByRole('button'));
//   });
// });
