import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../src/components/TodoList';

describe('TodoList Component', () => {
  beforeEach(() => {
    render(<TodoList />);
  });

  test('renders the todo input and button', () => {
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const buttonElement = screen.getByRole('button', { name: /add/i });
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('allows users to add a todo', () => {
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const buttonElement = screen.getByRole('button', { name: /add/i });

    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.click(buttonElement);

    expect(screen.getByText(/new todo/i)).toBeInTheDocument();
  });

  test('allows users to toggle a todo', () => {
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const buttonElement = screen.getByRole('button', { name: /add/i });

    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.click(buttonElement);

    const todoItem = screen.getByText(/new todo/i);
    fireEvent.click(todoItem);

    expect(todoItem).toHaveClass('completed'); // Assuming 'completed' class is added on toggle
  });

  test('allows users to delete a todo', () => {
    const inputElement = screen.getByPlaceholderText(/add a new todo/i);
    const buttonElement = screen.getByRole('button', { name: /add/i });

    fireEvent.change(inputElement, { target: { value: 'New Todo' } });
    fireEvent.click(buttonElement);

    const deleteButton = screen.getByRole('button', { name: /delete/i }); // Assuming delete button is present
    fireEvent.click(deleteButton);

    expect(screen.queryByText(/new todo/i)).not.toBeInTheDocument();
  });
});