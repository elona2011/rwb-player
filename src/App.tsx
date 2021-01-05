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

function App() {
  const [loading, setLoading] = useState(false)

  return (
    <div className="App">
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/loginuser">
              <LoginUser />
            </Route>
            <Route path="/paymoney">
              <PayMoney />
            </Route>
            <Route path="/">
              <Redirect
                to="/loginuser"
              />
            </Route>
          </Switch>
          {loading && (<div className="loading">
            <Spin size="large" />
          </div>)}
        </div>
      </Router>
    </div>
  );
}

export default App;
