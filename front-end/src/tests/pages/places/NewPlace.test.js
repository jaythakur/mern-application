import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import NewPlace from '../../../pages/places/NewPlace';

describe('Test <NewPlace> component', () => {
  it('should render form elements', () => {
    render(<NewPlace />);
    expect(screen.getByLabelText('Title')).toBeDefined();
    expect(screen.getAllByRole('textbox')).toHaveLength(3);
  });
  it('should render disabled button', () => {
    render(<NewPlace />);
    expect(screen.getByRole('button').hasAttribute('disabled')).toBe(true);
  });
  it('should submit form onsubmit', () => {
    render(<NewPlace />);
    fireEvent.submit(screen.getByRole('button'));
  });
});
