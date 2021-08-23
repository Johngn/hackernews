import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination component', () => {
  test('Updates text correctly on page change', () => {
    const { rerender } = render(
      <Pagination page={0} pageLength={12} storiesLength={100} />
    );

    expect(screen.getByText('1-12 of 100')).toBeInTheDocument();

    rerender(<Pagination page={1} pageLength={12} storiesLength={100} />);
    expect(screen.getByText('13-24 of 100')).toBeInTheDocument();
  });

  test('stops highValue being greater than total amount of stories', () => {
    render(<Pagination page={1} pageLength={12} storiesLength={20} />);

    expect(screen.getByText('13-20 of 20')).toBeInTheDocument();
  });

  test('disables prev button on first page', () => {
    render(<Pagination page={0} pageLength={12} storiesLength={20} />);

    const prevButton = screen.getByRole('button', { name: 'Prev' });
    expect(prevButton).toBeDisabled();
  });

  test('disables next button on last page', () => {
    render(<Pagination page={1} pageLength={12} storiesLength={20} />);

    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeDisabled();
  });

  test('clicking buttons fires function', () => {
    const handleClick = jest.fn();
    render(<Pagination setPage={handleClick} />);

    const nextButton = screen.getByRole('button', { name: 'Next' });

    userEvent.click(nextButton);
    expect(handleClick).toHaveBeenCalledTimes(1);

    const prevButton = screen.getByRole('button', { name: 'Prev' });

    userEvent.click(prevButton);
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
