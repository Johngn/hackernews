import axios from 'axios';

const baseURL = 'https://hacker-news.firebaseio.com/v0';

export const getAllStoryIDs = async () => {
  const res = await axios.get(`${baseURL}/newstories.json`);
  // Slicing the array of IDs so we don't do 500 GET requests every time
  return res.data.slice(0, 20);
};

export const getSingleItemDetails = async ID => {
  const res = await axios.get(`${baseURL}/item/${ID}.json`);
  return res.data;
};

export const getAllItemDetails = async IDs => {
  // This is ugly but I need the details for all stories if I want to sort and search them
  const res = await Promise.all(
    IDs.map(async ID => {
      return getSingleItemDetails(ID);
    })
  );
  return res;
};
