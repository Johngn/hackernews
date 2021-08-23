import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('Error component', () => {
  test('displays error recieved from props', () => {
    render(<Error message={'There was an error'} />);

    const errorTest = screen.getByText('There was an error');
    expect(errorTest).toBeInTheDocument();
  });

  test('displays backup error if props are falsey', () => {
    render(<Error message={''} />);

    const errorTest = screen.getByText('An unexpected error occured');
    expect(errorTest).toBeInTheDocument();
  });
});
