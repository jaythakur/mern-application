import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import NavLinks from '../../../../shared/components/Navigation/NavLinks';
import { AuthContext } from '../../../../shared/context/auth-context';

describe('render <NavLinks>', () => {
  it('should render default ALL USERS link', () => {
    render(
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <BrowserRouter>
          <NavLinks />
        </BrowserRouter>
      </AuthContext.Provider>,
    );
    expect(screen.getByText('ALL USERS')).toBeDefined();
    expect(screen.getByText('LOGOUT')).toBeDefined();
    expect(screen.queryByText('AUTHENTICATE')).toBeNull();
  });
  it('should render logged in user links', () => {
    render(
      <AuthContext.Provider value={{ isLoggedIn: false }}>
        <BrowserRouter>
          <NavLinks />
        </BrowserRouter>
      </AuthContext.Provider>,
    );
    expect(screen.getByText('ALL USERS')).toBeDefined();
    expect(screen.queryByText('LOGOUT')).toBeNull();
    expect(screen.queryByText('AUTHENTICATE')).toBeDefined();
  });
});
