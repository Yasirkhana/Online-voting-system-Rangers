import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import SignIn from './SignIn';

test('login button triggers PostData function', () => {


  render(
      <SignIn />
  );

  const emailInput = screen.getByPlaceholderText('email');
  const passwordInput = screen.getByPlaceholderText('password');
  const loginButton = screen.getByRole('button', { name: 'Log In' });

  // Simulate user input
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  // Trigger login button click
  fireEvent.click(loginButton);

  // Assertions or expectations about the PostData function being triggered
});
