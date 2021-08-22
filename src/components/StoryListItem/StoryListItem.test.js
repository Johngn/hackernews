import { render, screen } from '@testing-library/react';

import StoryListItem from './StoryListItem';

describe('Story list component', () => {
  test('displays external link to story', () => {
    render(<StoryListItem title="testTitle" url="http://test.com" />);

    const link = screen.getByRole('link', { name: 'testTitle' });

    expect(link).toBeInTheDocument();
  });
});
