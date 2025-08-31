import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList.jsx';

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Test the App')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    fireEvent.change(screen.getByTestId('new-todo-input'), {
      target: { value: 'New Todo' }
    });
    fireEvent.click(screen.getByTestId('add-todo-button'));
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('toggles todo completion', () => {
    render(<TodoList />);
    const todoItem = screen.getByText('Learn React');
    expect(todoItem).not.toHaveStyle('text-decoration: line-through');
    fireEvent.click(todoItem);
    expect(todoItem).toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    const todoItem = screen.getByText('Learn React');
    const deleteButton = screen.getByTestId(`delete-todo-1`);
    fireEvent.click(deleteButton);
    expect(todoItem).not.toBeInTheDocument();
  });
});
