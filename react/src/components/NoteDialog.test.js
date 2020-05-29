import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import NoteDialog from './NoteDialog';

test('Test Header Bar rendering', () => {
  const { getByText } = render(<NoteDialog buttonMode="Edit" users={[]} />)
  const linkElement = getByText(/Edit/i)
  expect(linkElement).toBeInTheDocument()
});
