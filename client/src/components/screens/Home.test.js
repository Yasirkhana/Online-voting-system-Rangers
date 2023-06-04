import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

test('renders the Home component', () => {
  render(<Home />);
  
  // Assert that the component is rendered correctly
  // You can add more specific assertions based on your component's structure
  expect(screen.getByText('Vote')).toBeInTheDocument();
});

test('clicking the vote button triggers the votePlayer function', () => {
  const mockData = [
    { _id: '1', title: 'Title 1', photo: 'photo1.jpg', votes: [] },
    { _id: '2', title: 'Title 2', photo: 'photo2.jpg', votes: [] },
  ];

  // Mock the fetch API to return the data for all posts
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve({ posts: mockData }),
    })
  );

  render(<Home />);
  
  // Assert that the vote buttons are rendered correctly
  expect(screen.getAllByText('Vote')).toHaveLength(2);

  // Mock the swal function
  jest.spyOn(global, 'swal').mockImplementation(() => Promise.resolve(true));

  // Click the vote button
  fireEvent.click(screen.getAllByText('Vote')[0]);

  // Assert that the votePlayer function is called
  // You can add more specific assertions based on your function's behavior
  expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/vote', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer null', // Mock the localStorage token value
    },
    body: JSON.stringify({
      postId: '1',
      userId: null, // Mock the localStorage user ID value
    }),
  });
});

// Add more unit tests as needed
