import {
  getAllStoryIDs,
  getSingleStoryDetails,
  getAllStoryDetails,
} from './httpRequests';

describe('get top story IDs from hackernews API', () => {
  test('returns an array of IDs with correct length', async () => {
    const [resultArray, error] = await getAllStoryIDs(10);

    expect(resultArray).toHaveLength(10);
    expect(error).toBeNull;
  });

  test('returns an array of IDs that are numbers', async () => {
    const [resultArray, error] = await getAllStoryIDs(10);

    resultArray.forEach(element => {
      expect(typeof element).toBe('number');
    });
    expect(error).toBeNull;
  });
});

describe('getSingleStoryDetails', () => {
  test('returns correct story details for particular ID', async () => {
    const testID = 8863; // example ID from https://github.com/HackerNews/API docs
    const storyDetails = await getSingleStoryDetails(testID);

    // Story that matches ID
    const expectedResult = {
      by: 'dhouston',
      descendants: 71,
      id: 8863,
      kids: [
        9224, 8917, 8952, 8958, 8884, 8887, 8869, 8940, 8908, 9005, 8873, 9671,
        9067, 9055, 8865, 8881, 8872, 8955, 10403, 8903, 8928, 9125, 8998, 8901,
        8902, 8907, 8894, 8870, 8878, 8980, 8934, 8943, 8876,
      ],
      score: 104,
      time: 1175714200,
      title: 'My YC app: Dropbox - Throw away your USB drive',
      type: 'story',
      url: 'http://www.getdropbox.com/u/2/screencast.html',
    };

    expect(storyDetails).toEqual(expectedResult);
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
