import { render, screen } from '@testing-library/react';
import StoryList from './StoryList';

test('displays list of story', async () => {
  render(<StoryList />);

  // const list = await screen.findAllByRole('link');
  // expect(list).toHaveLength(3);
});
