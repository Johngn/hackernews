<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a re-skin of [Hacker News](https://news.ycombinator.com/). The original website is a message board where users can post links to news stories and discuss them. They are usually related to programming or technology in some way. The point of this project is to improve on the aesthetics of the original website, and to enable better pagination, sorting, and searching. The finished project can be viewed [here](https://hardcore-wilson-5cf278.netlify.app/).

### Built With

- [React](https://reactjs.org/)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [SASS](https://sass-lang.com/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

You will need to have [Node](https://nodejs.org/en/) installed. Then you need to install NPM:

```sh
npm install npm@latest -g
```

### Installation

2. Clone the repo
   ```sh
   git clone https://github.com/Johngn/hackernews.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

## Design

This project was built with React, a framework/library which is not very opininated, allowing for a lot of different approaches to designing an application. I like to keep high level components which comprise pages in a 'pages' directory, with smaller building block components in a 'components' directory. Each component then gets its own directory, containing the component file, as well as the styles for that component and any tests that relate to the component.

Functional components were used exclusively, in line with the recommedations for the most up to date versions of React, and therefore hooks were used to manage state and execute side effects.

This was quite a simple application, with only one main 'page'; the FrontPage component. However I still created a separate directory for the pages, and placed this component there. The functionality of manipulating the results after they were recieved, such as sorting and pagination, is contained within this component. The actual requests were extracted to a separate 'utils' folder.

## Requests

The requests were placed in httpRequests.js in the 'utils' folder. [Axios](https://axios-http.com/) was used to make the requests just because of personal preference. I find it a bit more streamlined than the native Fetch API although both work equally well for most use cases.

This project uses the official [Hacker News API](https://github.com/HackerNews/API), which is free and does not require an API key. The endpoints that it provides are not ideal for creating a streamlined and fast application. The main endpoint to get the Top Stories is https://hacker-news.firebaseio.com/v0/topstories.json. This returns only the IDs of the stories, which is just an array of numbers. From there you have to individually call https://hacker-news.firebaseio.com/v0/item/{ID}.json for each story, which will return an object containing the details of the story.

Because the main endpoint only returns IDs, I had to call the endpoint to get story details in a loop, making a request with each ID to populate the FrontPage component with stories. As the main endpoint returns 500 IDs, this results in a slowdown as the page loads. I faked a way to fix this by slicing the ID array and just fetching fewer stories. To change the amount of stories requested

## Styling

There are many different ways to style a React application. I chose here to use SASS, and to

## Testing
