import { BrowserRouter, Route, Switch } from 'react-router-dom';

import StoryList from './pages/StoryList/StoryList';
import SingleStory from './pages/SingleStory/SingleStory';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={StoryList} />
        <Route exact path="/story/:id" component={SingleStory} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
