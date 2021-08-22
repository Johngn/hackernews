import { getAllStoryIDs } from './httpRequests';

describe('get top story IDs from hackernews API', () => {
  test('returns an array of IDs the correct length', () => {
    expect(getAllStoryIDs(3)).toHaveLength(3);
  });
});
