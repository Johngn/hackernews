import {
  getAllStoryIDs,
  getSingleStoryDetails,
  getAllStoryDetails,
} from './httpRequests';

describe('get top story IDs from hackernews API', () => {
  test('returns an array of IDs with correct length', async () => {
    const [resultArray, error] = await getAllStoryIDs(10);

    expect(resultArray).toHaveLength(10);
    expect(error).toBeNull();
  });

  test('returns an array of IDs that are numbers', async () => {
    const [resultArray, error] = await getAllStoryIDs(10);

    resultArray.forEach(element => {
      expect(typeof element).toBe('number');
    });
    expect(error).toBeNull();
  });

  test('returns all IDs if argument is falsey', async () => {
    const [resultArray, error] = await getAllStoryIDs(undefined);

    // Doesn't always return exactly 500, so check length is greater than 490
    expect(resultArray.length).toBeGreaterThan(490);
    expect(error).toBeNull();
  });
});

describe('getSingleStoryDetails', () => {
  test('returns correct story details for particular ID', async () => {
    const testID = 8863; // example ID from https://github.com/HackerNews/API docs
    const storyDetails = await getSingleStoryDetails(testID);

    // Story that matches ID (excluding properties that can change, such as score and descendants)
    expect(storyDetails).toHaveProperty('by', 'dhouston');
    expect(storyDetails).toHaveProperty('id', 8863);
    expect(storyDetails).toHaveProperty('time', 1175714200);
    expect(storyDetails).toHaveProperty(
      'title',
      'My YC app: Dropbox - Throw away your USB drive'
    );
    expect(storyDetails).toHaveProperty('type', 'story');
  });

  test('return null on ID that does not exist', async () => {
    const testID = 999999999;
    const storyDetails = await getSingleStoryDetails(testID);

    expect(storyDetails).toBeNull();
  });
});

describe('getAllStoryDetails', () => {
  test('returns array of objects of correct length', async () => {
    // exampleIDs taken from https://github.com/HackerNews/API docs
    const exampleIDs = [9127232, 9128437, 9130049];
    const [allStoryDetails, error] = await getAllStoryDetails(exampleIDs);

    expect(allStoryDetails).toHaveLength(3);
    expect(error).toBeNull();
  });

  test('returns array of stories with correct properties', async () => {
    const exampleIDs = [9127232, 9128437, 9130049];
    const [allStoryDetails, error] = await getAllStoryDetails(exampleIDs);

    allStoryDetails.forEach(element => {
      expect(element).toHaveProperty('by');
      expect(element).toHaveProperty('id');
      expect(element).toHaveProperty('type', 'story');
    });

    expect(error).toBeNull();
  });

  test('removes null values before returning array', async () => {
    const idThatWillReturnNull = 28274652;
    const exampleIDs = [idThatWillReturnNull, 9128437, 9130049];

    const allStoryDetails = await getAllStoryDetails(exampleIDs);

    expect(allStoryDetails).toHaveLength(2);
  });
});
