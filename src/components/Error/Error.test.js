import { render, screen } from '@testing-library/react';
import Error from './Error';

test('Displays error recieved from props', () => {
  render(<Error message={'There was an error'} />);

  const errorTest = screen.getByText('There was an error');
  expect(errorTest).toBeInTheDocument();
});
