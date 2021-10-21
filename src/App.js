import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import ToDoList from "./pages/Todolist/ToDoList";

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
