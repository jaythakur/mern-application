import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Button from '../../../../shared/components/FormElements/Button/Button';

describe('<Button /> component', () => {
  it('should render an <button> tag', () => {
    render(<Button type="button" />);
    expect(screen.queryAllByRole('button')).not.toBeNull();
  });

  it('should have a class attribute', () => {
    const { container } = render(<Button type="button" />);
    expect(container.querySelector('button').hasAttribute('class')).toBe(true);
  });

  it('should have a class button--inverse', () => {
    const { container } = render(<Button type="button" inverse />);
    expect(
      container.querySelector('button').classList.contains('button--inverse'),
    ).toBe(true);
  });

  it('should render an <link> tag', () => {
    const { container } = render(
      <Router>
        <Button type="button" to="/" />
      </Router>,
    );
    expect(container.querySelector('a').hasAttribute('class')).toBe(true);
  });

  it('should render an <a> tag', () => {
    const { container } = render(
      <Router>
        <Button type="button" href="/" />
      </Router>,
    );
    expect(container.querySelector('a')).not.toBeNull();
    expect(
      container.querySelector('a').classList.contains('button--default'),
    ).not.toBeNull();
  });
});
