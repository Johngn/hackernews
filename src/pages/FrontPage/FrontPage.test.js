import { render, screen } from '@testing-library/react';
import FrontPage from './FrontPage';

test('displays list of stories', async () => {
  const { findByRole } = render(<FrontPage state={{ isLoading: false }} />);

  const nextButton = await screen.findAllByRole('button');
  // expect(list).toHaveLength(3);
});
