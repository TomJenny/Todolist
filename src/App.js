import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ToDoList from './pages/Todolist/ToDoList';
import Home from './pages/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/todolist" component={ToDoList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
