import axios from 'axios';

export const baseURL = 'https://hacker-news.firebaseio.com/v0';

export const getAllStoryIDs = async numberOfStories => {
  const res = await axios.get(`${baseURL}/newstories.json`);
  // Slicing the array of IDs so we don't do 500 GET requests every time
  return res.data.slice(0, numberOfStories);
};

export const getSingleStoryDetails = async ID => {
  const res = await axios.get(`${baseURL}/item/${ID}.json`);
  return res.data;
};

export const getAllStoryDetails = async IDs => {
  // This is ugly but I need the details for all stories if I want to sort and search them
  const res = await Promise.all(
    IDs.map(async ID => {
      return getSingleStoryDetails(ID);
    })
  );

  // some story IDs just return null so need to remove them:
  return res.filter(story => story);
};
