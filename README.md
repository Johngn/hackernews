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
    <li>
      <a href="#design">Design</a>
      <ul>
        <li><a href="#requests">Requests</a></li>
        <li><a href="#styling">Styling</a></li>
        <li><a href="#testing">Testing</a></li>
      </ul>
    </li>
	<li><a href="#future">Future</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project is a re-skin of [Hacker News](https://news.ycombinator.com/). The original website is a message board where users can post links to news stories and discuss them. They cover a wide range of topics, but are often related to programming or technology in some way. The point of this project is to improve on the aesthetics of the original website, and to enable better pagination, sorting, and searching.

The finished project is deployed at https://hardcore-wilson-5cf278.netlify.app/.

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

Clone the repository:

```sh
git clone https://github.com/Johngn/hackernews.git
```

cd into the directory:

```sh
cd hackernews
```

Install NPM packages:

```sh
npm install
```

And then run with:

```sh
npm start
```

The application should automatically open in a new browser tab at http://localhost:3000/

## Design

This project was built with React, a framework/library which is not very opininated, allowing for a lot of different approaches to designing an application. I like to keep high level components which comprise pages in `src/pages/`, with smaller building block components in `src/components/`. Each component then gets its own directory, containing the component file, as well as the styles for that component and any tests that relate to the component.

Functional components were used exclusively, in line with the recommedations for the most up to date versions of React, and therefore hooks were used to manage state and execute side effects.

This was quite a simple application, with only one main 'page'; the FrontPage component. However I still created a separate directory for the pages, and placed this component there. The functionality of manipulating the results after they were recieved, such as sorting and pagination, is contained within this component. The actual requests were extracted to `src/utils/httpRequests.js`.

The FrontPage component contains an effect that runs whenever the search box is used or a different option on the select is chosen. The effect then filters and sorts the stories based on those inputs. The pagination state is also contained within this component, but the pagination buttons have their own component, with the state being lifted up to the parent component. The array of displayed stories is then simply sliced based on the pagination state, and the pagination component itself also reflects these changes.

### Requests

The requests were placed in `src/utils/httpRequests.js`. [Axios](https://axios-http.com/) was used to make the requests just because of personal preference. I find it a bit more streamlined than the native Fetch API.

This project uses the official [Hacker News API](https://github.com/HackerNews/API), which is free and does not require an API key. The endpoints that it provides are not ideal for creating a streamlined and fast application. The main endpoint to get the Top Stories is https://hacker-news.firebaseio.com/v0/topstories.json. This returns only the IDs of the stories, which is just an array of numbers. From there you have to individually call https://hacker-news.firebaseio.com/v0/item/{ID}.json for each story, which will return an object containing the story details, such as the author, number of comments, external link and so on.

Because the main endpoint only returns IDs, I had to call the endpoint to get story details in a loop, making a request with each ID to populate the FrontPage component with stories. As the main endpoint returns 500 IDs, this results in a slowdown as the page loads. I faked a way to fix this by slicing the ID array and just fetching fewer stories. To change the amount of stories requested you need to edit `src/config.js`. The default is 100 requests.

### Styling

There are many different ways to style a React application. I chose here to use SASS, and to place the styles for each component within the component's own directory. The top level div or element then had a className that wrapped all other elements, allowing each stylesheet to be effectively scoped to that component using nested styles. Utilizing nested styles reduces the number of classNames required within each component, which I find makes for cleaner code.

Global styles and variables are placed in `src/index.scss`, which is then imported into each individual SASS file that uses those variables. Each stylesheet is then imported into its corresponding component. Of course they could be imported into any component, but this keeps things a bit more organised. I used some media queries in some files to provide a better experience on smaller screens.

### Testing

The application can be tested by running:

```sh
npm test
```

Automated testing for the application is carried out with Jest and React Testing Library. React Testing Library encourages functional testing, and attempting to mimic the user experience more than unit testing individual functions, and also encourages development with accessibility in mind. For this reason it provides ways to locate elements that more closely resemble how screen readers and other assistive technologies interact with the web page.

This higher level approach means that it sometimes doesn't make sense for each component to have its own tests, and instead the component is tested higher up the child/parent tree where the important stuff is happening. I followed this approach here, with most of the tests of the functionality of the application being contained within `scr/App.test.js`. Here the sorting, searching, and pagination is tested. Tests of the display properties of some of the child components can be found within their own directory.

The http requests are tested within `src/utils/httpRequests.test.js`. Here there are more traditional unit type tests, where the return values of the functions in `src/utils/httpRequests.js` are tested.

These are not end-to-end tests, and I tried to separate functionality where appropriate to make more focused tests. For example, I test the request to get all the stories separately from the sorting of the stories, and use a mock set of stories to test the sorting. This mock data is found in `src/mocks/mockStories.js`.

## Future

With a bit more time I would implement the ability to change the length of each page dynamically. Right now it is just set as a constant in `FrontPage.js`. This could be done with a slider that updated the amount of visible stories as it was changed. The tests in `App.test.js` would need to be updated to reflect that the page length is no longer hardcoded.

I would also add a router and create a page for each individual story. This would display all the comments related to a particular story. I could use React Router and pass the story ID in the url params, and then get the story details when the component mounts. You would need to re-fetch the data on this page to allow refreshing of the page.
