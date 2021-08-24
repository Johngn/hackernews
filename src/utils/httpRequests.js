import axios from 'axios';

const baseURL = 'https://hacker-news.firebaseio.com/v0';

export const getAllStoryIDs = async numberOfStoriesRequested => {
  try {
    const res = await axios.get(`${baseURL}/newstories.json`);

    // if numberOfStoriesRequested argument is not provided then don't slice array
    const sliceBy = numberOfStoriesRequested || -1;

    // Slicing the array of IDs so we don't do 500 GET requests every time
    return [res.data.slice(0, sliceBy), null];
  } catch (error) {
    return [[], error.message];
  }
};

export const getSingleStoryDetails = async ID => {
  try {
    const res = await axios.get(`${baseURL}/item/${ID}.json`);
    return res.data;
  } catch (error) {
    return null;
  }
};

export const getAllStoryDetails = async IDs => {
  try {
    // This is ugly but I need the details for all stories if I want to sort and search them
    const res = await Promise.all(
      IDs.map(async ID => {
        return getSingleStoryDetails(ID);
      })
    );

    // some story IDs just return null so need to remove them:
    const filteredResponse = res.filter(story => story);

    return [filteredResponse, null];
  } catch (error) {
    return [[], error.message];
  }
};
