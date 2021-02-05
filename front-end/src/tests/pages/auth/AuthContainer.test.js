import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AuthContainer from '../../../pages/auth/AuthContainer'; 

describe('render <AuthContainer> Component', () => {
  it('should render component', () => {
    render(<AuthContainer />);
    expect(screen.getByText('Login Required')).toBeDefined();
  });
  it('Should render SWITCH TO SIGNUP button', () => {
    render(<AuthContainer />);
    const button = screen.getByText('SWITCH TO SIGNUP');
    expect(button).toBeDefined();
    fireEvent.click(button);
    expect(screen.getByText('SWITCH TO LOGIN')).toBeDefined();
  });
  it('Should render SWITCH TO LOGIN button after click on SIGNUP BUTTON', () => {
    render(<AuthContainer />);
    const button = screen.getByText('SWITCH TO SIGNUP');
    fireEvent.click(button);
    expect(screen.getByText('SWITCH TO LOGIN')).toBeDefined();
    fireEvent.click(screen.getByText('SWITCH TO LOGIN'));
    expect(screen.getByText('SWITCH TO SIGNUP')).toBeDefined();
  });
  it('Should submit form', () => {
    const { container } = render(<AuthContainer />);
    const submitBtn = screen.getByText('LOGIN');
    expect(submitBtn).toBeDefined();
    expect(submitBtn).toBeDisabled(true);
    const emailInput = container.querySelector('#email');
    userEvent.type(emailInput, 'test@gmail.com');
    expect(emailInput).toHaveValue('test@gmail.com');
    const passwordInput = container.querySelector('#password');
    userEvent.type(passwordInput, '123456');
    expect(passwordInput).toHaveValue('123456');
    expect(screen.getByText('LOGIN').hasAttribute('disabled')).toBe(false);
    fireEvent.submit(submitBtn);
  });
  it('Should submit signup form', () => {
    render(<AuthContainer />);
    const button = screen.getByText('SWITCH TO SIGNUP');
    expect(button).toBeDefined();
    fireEvent.click(button);
    expect(screen.getByText('SWITCH TO LOGIN')).toBeDefined();
    expect(screen.getByText('SIGNUP')).toBeDefined();
    fireEvent.submit(screen.getByText('SIGNUP'));
  });
});
