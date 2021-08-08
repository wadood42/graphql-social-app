import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import { AuthProvider, AuthContext } from "./contexts/auth";
import AuthRoutes from "./components/AuthRoutes";
import Profile from "./pages/Profile";
import SinglePost from "./pages/SinglePost";
import { useContext } from "react";
function App() {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <Router>
      <div className='main-container'>
        <MenuBar />
        <Switch>
          <Route exact path='/'>
            {user ? <Home /> : <Login />}
          </Route>
          {/* <AuthRoutes path='/login' component={Login} /> */}
          <AuthRoutes path='/register' component={Register} />
          <Route path='/posts/:postId'>
            {user ? <SinglePost /> : <Login />}
          </Route>
          <Route path='/:userId' component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
