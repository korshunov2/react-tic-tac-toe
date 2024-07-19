import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Board from './Board';

test('renders current player heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Current player/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders the Tic-Tac-Toe board', () => {
  render(<Board />);
  const cells = screen.getAllByRole('cell');
  expect(cells).toHaveLength(9); // Ensure the board has 9 cells
});

test('allows a player to make a move', () => {
  render(<Board />);
  const cells = screen.getAllByRole('cell');
  fireEvent.click(cells[0]);
  expect(cells[0]).toHaveTextContent('X'); // Assuming X starts the game
});

test('detects a winning condition', () => {
  render(<Board />);
  const cells = screen.getAllByRole('cell');
  fireEvent.click(cells[0]); // X
  fireEvent.click(cells[1]); // O
  fireEvent.click(cells[3]); // X
  fireEvent.click(cells[4]); // O
  fireEvent.click(cells[6]); // X wins
  const winMessage = screen.getByText(/X wins!/i);
  expect(winMessage).toBeInTheDocument();
});