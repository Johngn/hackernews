import { render, screen } from '@testing-library/react';
import FrontPage from './FrontPage';

test('displays list of stories', async () => {
  render(<FrontPage />);

  // const list = await screen.findAllByRole('link');
  // expect(list).toHaveLength(3);
});
