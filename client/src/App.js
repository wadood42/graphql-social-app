import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import { AuthProvider } from "./contexts/auth";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='main-container'>
          <MenuBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
