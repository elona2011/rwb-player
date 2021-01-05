import React, { createContext, useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  BrowserRouter
} from "react-router-dom";
import 'antd/dist/antd.css';
import './App.css';
import LoginUser from './pages/loginUser/loginUser'
import PayMoney from './pages/payMoney/payMoney'
import { Spin, Space } from 'antd';
import { ProvideAuth, PrivateRoute } from './pages/auth/auth'


function App() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="App">
      <ProvideAuth>
        <Router>
          <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/player/loginuser">
                <LoginUser />
              </Route>
              <PrivateRoute path="/player/paymoney">
                <PayMoney />
              </PrivateRoute>

              {/* <Route path="/">
                <Redirect
                  to="/loginuser"
                />
              </Route> */}
            </Switch>
            {loading && (<div className="loading">
              <Spin size="large" />
            </div>)}
          </div>
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
