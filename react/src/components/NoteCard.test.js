import React from 'react';
import { render } from '@testing-library/react';
import NoteCard from './NoteCard';
import CardHeader from '@material-ui/core/CardHeader'

test('Test Header Bar rendering', () => {
  const { getByText } = render(<NoteCard text="text" title="title should be title" users={[]} />)
  const linkElement = getByText(/title should be title/i)
  expect(linkElement).toBeInTheDocument()
});
