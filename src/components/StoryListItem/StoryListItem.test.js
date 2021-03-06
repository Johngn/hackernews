import { render, screen } from '@testing-library/react';

import StoryListItem from './StoryListItem';

describe('Story list component', () => {
  test('displays details of story with correct props', () => {
    render(
      <StoryListItem
        title="testTitle"
        url="http://test.com"
        by={'testUser'}
        score={10}
        descendants={5}
      />
    );

    const link = screen.getByRole('link', { name: 'testTitle' });
    expect(link).toBeInTheDocument();

    const userElement = screen.getByText('testUser');
    expect(userElement).toBeInTheDocument();

    const scoreElement = screen.getByText('10 points', {
      exact: false,
    });
    expect(scoreElement).toBeInTheDocument();

    const commentElement = screen.getByText('5 comments');
    expect(commentElement).toBeInTheDocument();
  });

  test('removes "s" at end of "points" and "comments" when amount = 1', () => {
    render(<StoryListItem by={'testUser'} score={1} descendants={1} />);

    const scoreElement = screen.getByText('1 point ', {
      exact: false,
    });
    expect(scoreElement).toBeInTheDocument();

    const commentElement = screen.getByText('1 comment');
    expect(commentElement).toBeInTheDocument();
  });
});
