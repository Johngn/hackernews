import axios from 'axios';

export const baseURL = 'https://hacker-news.firebaseio.com/v0';

export const getAllStoryIDs = async numberOfStories => {
  try {
    const res = await axios.get(`${baseURL}/newstories.json`);

    // Slicing the array of IDs so we don't do 500 GET requests every time
    return [res.data.slice(0, numberOfStories), null];
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
    console.log(error.message);
    return [[], error.message];
  }
};
