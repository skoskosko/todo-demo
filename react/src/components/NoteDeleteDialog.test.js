import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NoteDeleteDialog from './NoteDeleteDialog';


test('Test Header Bar rendering', () => {
  const temp = jest.fn()
  const { getByText } = render(<NoteDeleteDialog buttonMode="Edit" deleteCb={temp} />)
  const dialog = getByText("Delete");
  fireEvent.click(dialog);
  const del = getByText("Yes");
  fireEvent.click(del);
  expect(temp).toBeCalled()
});
