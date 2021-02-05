import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import UsersList from '../../../../pages/users/components/UsersList/UsersList';

describe('render <UsersList> component', () => {
  it('should render component with no users found', () => {
    render(<UsersList items={[]} />);
    expect(screen.getByText('No users found.')).toBeDefined();
  });
  it('should pass all items props to rendered component', () => {
    const items = [
      { id: '1', name: 'Hello', image: 'image', places: 2 },
      { id: '2', name: 'World', image: 'image', places: 2 },
    ];

    const { getAllByRole, getByText } = render(
      <Router>
        <UsersList items={items} />
      </Router>,
    );
    const elements = getAllByRole('listitem');
    expect(elements).toHaveLength(2);
    expect(getByText(items[0].name)).not.toBeNull();
    expect(getByText(items[1].name)).not.toBeNull();
  });
});
