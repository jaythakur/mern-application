import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import PlaceItem from '../../../../pages/places/components/PlaceItem';
import { AuthContext } from '../../../../shared/context/auth-context';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (element) => element,
  // eslint-disable-next-line no-dupe-keys
  createPortal: (element) => element,
}));

describe('render component when no items', () => {
  const props = {
    id: 'id',
    title: 'title',
    address: 'address',
    description: 'description',
    imageUrl: 'imageUrl',
  };

  it('should render no places when no items', () => {
    render(
      <Router>
        <PlaceItem {...props} />
      </Router>,
    );
    expect(screen.getByRole('listitem')).toBeDefined();
  });
  it('should find Cencel button', () => {
    render(
      <Router>
        <PlaceItem {...props} />
      </Router>,
    );
    const button = screen.getByText('VIEW ON MAP');
    expect(button).toBeDefined();
    fireEvent.click(button);
    const closeBtn = screen.getByText('Close');
    expect(closeBtn).toBeDefined();
    fireEvent.click(closeBtn);
  });

  it('should render edit and cancel button when user is logged-in', () => {
    render(
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <Router>
          <PlaceItem {...props} />
        </Router>
      </AuthContext.Provider>,
    );
    const button = screen.getByText('EDIT');
    expect(button).toBeDefined();
    const delbtn = screen.getByText('DELETE');
    expect(delbtn).toBeDefined();
    fireEvent.click(delbtn);
    const cancelBtn = screen.getByText('Cancel');
    expect(cancelBtn).toBeDefined();
    fireEvent.click(cancelBtn);
  });
  it('should close confirmation popup on onlick on delete button', () => {
    render(
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <Router>
          <PlaceItem {...props} />
        </Router>
      </AuthContext.Provider>,
    );
    const button = screen.getByText('EDIT');
    expect(button).toBeDefined();
    const delbtn = screen.getByText('DELETE');
    expect(delbtn).toBeDefined();
    fireEvent.click(delbtn);
    const cancelBtn = screen.getByText('Delete');
    expect(cancelBtn).toBeDefined();
    fireEvent.click(cancelBtn);
  });
  it('should close backdrop when user click on window', () => {
    render(
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <Router>
          <PlaceItem {...props} />
        </Router>
      </AuthContext.Provider>,
    );
    const delbtn = screen.getByText('DELETE');
    fireEvent.click(delbtn);
    expect(screen.getByText('Are you sure?')).toBeDefined();
    expect(screen.getByTestId('backdrop')).toBeDefined();
    fireEvent.click(screen.getByTestId('backdrop'));
    expect(screen.getByText('Are you sure?')).toBeDefined();
  });
});
