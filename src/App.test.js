import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FrontPage from './pages/FrontPage/FrontPage';

import { mockStories } from './mocks/mockStories';

describe('Frontpage', () => {
  test('sorts by number of comments when "Comments" option is selected', () => {
    render(<FrontPage stories={mockStories} />);

    const sortSelect = screen.getByRole('combobox');
    userEvent.selectOptions(sortSelect, ['Comments']);

    const storyList = screen.getAllByRole('link');
    // story at [13] in mockStories has highest number of comments
    expect(storyList[0].href).toEqual(mockStories[13].url);
  });

  test('sorts by score when "Score" option is selected', () => {
    render(<FrontPage stories={mockStories} />);

    const sortSelect = screen.getByRole('combobox');
    userEvent.selectOptions(sortSelect, ['Score']);

    const storyList = screen.getAllByRole('link');
    // story at [14] in mockStories has highest score
    expect(storyList[0].href).toEqual(mockStories[14].url);
  });

  test('sorts by new after selecting one of the other options then reselecting "New"', () => {
    render(<FrontPage stories={mockStories} />);

    const sortSelect = screen.getByRole('combobox');
    userEvent.selectOptions(sortSelect, ['Score']);

    userEvent.selectOptions(sortSelect, ['New']);

    const storyList = screen.getAllByRole('link');
    // story at [0] in mockStories is the newest (highest ID)
    expect(storyList[0].href).toEqual(mockStories[0].url);
  });

  test('navigates pages on pagination button click', async () => {
    render(<FrontPage stories={mockStories} />);

    const prevButton = screen.getByRole('button', { name: 'Prev' });
    const nextButton = screen.getByRole('button', { name: 'Next' });

    expect(screen.getByText('1-13 of 15')).toBeInTheDocument();

    userEvent.click(nextButton);
    expect(screen.getByText('14-15 of 15')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);

    userEvent.click(prevButton);
    expect(screen.getByText('1-13 of 15')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(13);
  });

  test('typing in searchbox filters storyList', () => {
    render(<FrontPage stories={mockStories} />);

    const searchBox = screen.getByRole('textbox');
    userEvent.type(searchBox, 'scientists'); // only one story has 'scientist' in its title
    expect(screen.getAllByRole('link')).toHaveLength(1);

    userEvent.clear(searchBox);
    expect(screen.getAllByRole('link')).toHaveLength(13);

    userEvent.type(searchBox, 'how');
    expect(screen.getAllByRole('link')).toHaveLength(2); // two stories have 'how' in their title
  });

  test('sorting resets to first page', () => {
    render(<FrontPage stories={mockStories} />);

    const nextButton = screen.getByRole('button', { name: 'Next' });
    userEvent.click(nextButton);
    expect(screen.getByText('14-15 of 15')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);

    const sortSelect = screen.getByRole('combobox');
    userEvent.selectOptions(sortSelect, ['Comments']);
    expect(screen.getByText('1-13 of 15')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(13);
  });

  test('sorting works on filtered stories', () => {
    render(<FrontPage stories={mockStories} />);

    const searchBox = screen.getByRole('textbox');
    userEvent.type(searchBox, 'y'); // 11 story have 'y' in their title
    expect(screen.getAllByRole('link')).toHaveLength(11);

    const sortSelect = screen.getByRole('combobox');
    userEvent.selectOptions(sortSelect, ['Comments']);
    expect(screen.getAllByRole('link')).toHaveLength(11);

    const storyList = screen.getAllByRole('link');
    // story at [4] in  mockStories has highest number of comments after story at [13] is removed
    expect(storyList[0].href).toEqual(mockStories[4].url);
  });
});
