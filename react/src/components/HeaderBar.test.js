import React from 'react';
import { render } from '@testing-library/react';
import HeaderBar from './HeaderBar';

test('Test Header Bar rendering', () => {
  const { getByText } = render(<HeaderBar users={[]} />);
  const linkElement = getByText(/Esko Takku - Note Demo/i);
  expect(linkElement).toBeInTheDocument();
});
