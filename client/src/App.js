import './index.css';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Auth from './pages/Auth.js';
import Configure from './pages/Configure.js';
import Github from './pages/Github';
import Youtube from './pages/Youtube';
import Reddit from './pages/Reddit';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/auth">
          <Auth/>
        </Route>
        <Route exact path="/configure">
          <Configure />
        </Route>
        <Route exact path="/github">
          <Github />
        </Route>
        <Route exact path="/youtube">
          <Youtube />
        </Route>
        <Route exact path="/reddit">
          <Reddit />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
