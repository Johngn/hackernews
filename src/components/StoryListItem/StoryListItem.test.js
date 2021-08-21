import { render, screen } from '@testing-library/react';

import StoryListItem from './StoryListItem';

describe('Story list component', () => {
  test('displays title of story', () => {
    render(<StoryListItem title="testTitle" />);

    const titleElement = screen.getByRole('link', { name: 'testTitle' });

    expect(titleElement).toBeInTheDocument();
  });

  test('displays story url', () => {
    render(<StoryListItem url="http://test.com" />);

    const link = screen.getByRole('link', { name: 'http://test.com' });

    expect(link).toBeInTheDocument();
  });
});
