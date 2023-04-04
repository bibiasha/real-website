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
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
import Orders from './Orders';

//loadStripe:
const promise = loadStripe('pk_test_51MrPTtSA4AQcOAQXWlfBXzGRUB8anYXzh0QoZKNJGK9VUUi8iWaiENOHltUKiuhazhyKVZkq6u5DdxIVENswo5Em00VD9HebRR');
// pk_test_51MrPTtSA4AQcOAQXWlfBXzGRUB8anYXzh0QoZKNJGK9VUUi8iWaiENOHltUKiuhazhyKVZkq6u5DdxIVENswo5Em00VD9HebRR

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
  }, [])
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
        <Route path="/orders" element={
          <React.Fragment>
            <Header />
            <Orders />
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
            <Elements stripe={promise}>  {/*//higher order function && it wrap the payment component* */}
              <Payment />
            </Elements>
          </React.Fragment>
        } />
      </Routes>
    </Router>
  );
}

export default App;
