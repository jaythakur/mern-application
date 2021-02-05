import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import UsersContainer from '../../../pages/users/UsersContainer';

describe('render <UsersContainer>', () => {
  it('should render user list', () => {
    render(
      <BrowserRouter>
        <UsersContainer />
      </BrowserRouter>,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});
