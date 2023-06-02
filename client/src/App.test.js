import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders E-Voting System link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/E-Voting System/i);
  expect(linkElement).toBeInTheDocument();
});
