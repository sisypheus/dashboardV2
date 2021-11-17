import './index.css';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Auth from './pages/Auth.js';
import Configure from './pages/Configure.js';

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
      </Switch>
    </Router>
  );
}

export default App;
