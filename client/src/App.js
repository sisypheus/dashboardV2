import './index.css';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Auth from './pages/Auth.js';
import Configure from './pages/Configure.js';
import Github from './pages/Github';
import Google from './pages/Google';

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
        <Route exact path="/google">
          <Google />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
