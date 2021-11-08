import './index.css';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Auth from './pages/Auth.js';

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
      </Switch>
    </Router>
  );
}

export default App;
