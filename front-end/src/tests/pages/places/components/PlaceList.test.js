import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import PlaceList from '../../../../pages/places/components/PlaceList';

describe('render component when no items', () => {
  it('should render no places when no items', () => {
    render(
      <Router>
        <PlaceList items={[]} />
      </Router>,
    );
    expect(
      screen.getByText('No places found. Maybe create one?'),
    ).toBeDefined();
  });
});

describe('render component', () => {
  it('should render with multiple places', () => {
    const items = [
      {
        id: '1',
        title: 'title',
        address: 'address',
        description: 'description',
        imageUrl: 'imageUrl',
      },
    ]
    render(
      <Router>
        <PlaceList items={items} />
      </Router>,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});
