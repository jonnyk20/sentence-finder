import React from 'react';
import { render } from '@testing-library/react';
import App, { TEST_ID } from './App';

test('Remders the app', () => {
  const { getByTestId } = render(<App />);
  const app = getByTestId(TEST_ID);
  expect(app).toBeInTheDocument();
});
