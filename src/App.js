import React, { useEffect } from 'react';
import './App.css';
import Header from './Header'
import Home from './Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Checkout from "./Checkout";
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';

function App() {

  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    //will run only once the app component loads
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        //user logged in 
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        //user logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }

    })
  })
  return (
    //BEM
    <Router>
      <Routes>

        <Route path="/" element={
          <React.Fragment>
            <Header />
            <Home />
          </React.Fragment>
        } />
        <Route path="/login" element={
          <React.Fragment>
            <Login />

          </React.Fragment>
        } />
        <Route path="/order" element={
          <React.Fragment>
            <Header />

          </React.Fragment>
        } />
        <Route path="/checkout" element={
          <React.Fragment>
            <Header />
            <Checkout />
          </React.Fragment>
        } />
        <Route path="/payment" element={
          <React.Fragment>
            <Header />
            <Payment/>
          </React.Fragment>
        } />
      </Routes>
    </Router>
  );
}

export default App;
