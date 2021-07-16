import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar';
import CreateStudent from './components/create-student-mentor';
import Home from './components/home';
import AssignMentor from './components/assign-mentor';
import ChangeMentor from './components/change-mentor';

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/create-student' component={CreateStudent} />
          <Route path='/create-mentor' component={CreateStudent} />
          <Route path='/assign-mentor' component={AssignMentor} />
          <Route path='/change-mentor' component={ChangeMentor} />

        </Switch>

      </Router>
    </div>
  );
}

export default App;
