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
import Footer from './Footer';

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
  }, []) //[]->code only runs once
  return (
    //BEM
    <Router>
      <Routes>    

        <Route path="/" element={
          <React.Fragment>
            <Header />
            <Home />
            <Footer />
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





//loadStripe: This will load the Stripe object and allow you to create payment forms, handle payment methods, and perform other Stripe-related tasks in your application.

//useStateValue() is a custom hook that is commonly used with state management libraries like Redux or React Context. It provides a way for components to access the global state of the application without having to pass props down through multiple layers of the component hierarchy.

//onAuthStateChanged method from an authentication service (auth) to check if a user is logged in or logged out.

//<Router> component is an essential part of building a single-page application with React, as it allows for dynamic navigation and rendering of components based on user interactions.

 // <Routes> component is used to define the individual routes within the application.

//The <Route> component is used to define a specific route within the application.

//The <React.Fragment> component provides a way to group a list of children without adding extra nodes to the DOM.

//The Elements component takes a stripe prop, which is a Promise object that resolves to a Stripe object. This stripe object provides a context for the child components to interact with Stripe and perform various payment-related operations, such as creating a payment intent, collecting payment details, and handling payment confirmation.


