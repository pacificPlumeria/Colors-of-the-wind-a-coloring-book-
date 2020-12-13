import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import Login from "./components/login";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/login.css';
import axios from 'axios';
import SignUp from './components/signUp';
import HomePage from './components/home.js';
import SignOut from './components/signOut';
// importing user context to set state for whole app
import UserContext from "./context/UserContext";
import ColoringPage from './components/coloringPage';
import ImageGallery from './components/ImageGallery';
import UserGallery from './components/userGallery';
import ImageDownload from './components/imageDownload';
import Showcase from './components/showcase';

function App() {
  const [userData, setUserData] = useState({
    token: undefined, //stores token
    user: undefined,  // stores id and username for user
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("http://localhost:5000/users/tokenIsValid", null, { headers: { "x-auth-token": token } });
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <div className="App">
      <div className="background">
        <Router>
          {/* Everything inside has access to the user data.  Gives state to all of the components. */}
          <UserContext.Provider value={{ userData, setUserData }}>
            <Navbar />
            <div className="container">
              <Switch>
                <Route path="/signUp" component={SignUp} />
                <Route path="/" exact component={HomePage} />
                <Route path="/coloringpage/:id" component={ColoringPage} />
                <Route path="/imageGallery" component={ImageGallery} />
                <Route path="/userGallery" component={UserGallery} />
                <Route path="/imageDownload/:id" component={ImageDownload} />
                <Route path="/showcase" component={Showcase} />
                <Route path="/signIn" component={Login} />
                <Route path="/signOut" component={SignOut} />
              </Switch>
            </div>
            <footer class="page-footer font-small">
              <div class="footer-copyright text-center py-3">
                <>© 2020 Copyright: </>
                <a class="copyright-link" href="https://mdbootstrap.com/">Wish Upon a Star</a>
              </div>
            </footer>
          </UserContext.Provider>
        </Router>
      </div>
    </div>

  );
}

export default App;
