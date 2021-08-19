import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Search from '../src/search';

expect.extend(toHaveNoViolations);

test('should not have any accessibility violations', async () => {
  const { container } = render(<Search searchQuery="" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('should render one post when user searches for preact', () => {
  render(<App />);

  let posts = screen.getAllByRole('listitem');
  expect(posts.length).toEqual(4);

  const searchBar = screen.getByRole('textbox');
  userEvent.type(searchBar, 'preact');

  posts = screen.getAllByRole('listitem');
  expect(posts.length).toEqual(1);
});
