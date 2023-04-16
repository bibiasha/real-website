import React from 'react'
import { useState } from 'react';
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom'
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
//import { useEffect } from 'react';

import { db } from './firebase';
import DeliveryForm from './DeliveryForm';
//import axios from 'axios';

function Payment() {
    //const navigate = useNavigate();
    const [{ basket, user }, dispatch] = useStateValue();

    //const stripe = useStripe();
    //const elements = useElements();

    // const [succeeded, setSucceeded] = useState(false);
    // const [processing, setProcessing] = useState("");
    // const [error, setError] = useState(null);
    // const [disabled, setDisabled] = useState(true);

    // const [clientSecret, setClientSecret] = useState('');

    // const [clientSecret, setClientSecret] = useState('');
    // useEffect(() => {
    //     //generate the special stripe secret  which allow to charge a customer
    //     const getClientSecret = async () => {
    //         const response = await axios({
    //             method: 'post',
    //             //stripe expect the total in a currency subunit
    //             url: `/payments/create?total=${getBasketTotal(basket) * 100}`
    //         })
    //         console.log("response =>", response.data)
    //         setClientSecret(response.data.clientSecret)
    //     }
    //     getClientSecret();
    // }, [basket])

    // console.log("clienSecret", clientSecret)
    // console.log("clienSecret", user)


    // const handleSubmit = async (event) => {
    //     event.preventDefault(); {/* event.preventDefault():if the event does not get explicitly handled, its default action should not be taken as it normally would be. */ }
    //     setProcessing(true);

    // const payload = await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //         card: elements.getElement(CardElement)
    //     }
    // }).then(({ paymentIntent }) => {
    //     //no Sequeal data base
    //     db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
    //         basket: basket,
    //         amount: paymentIntent.amount,
    //         created: paymentIntent.created
    //     })            //paymentIntent=payment confirmation
    //     setSucceeded(true);
    //     setError(null);
    //     setProcessing(false);

    //     dispatch({
    //         type: 'EMPTY_BASKET'
    //     })

    //     // navigate.replace('/orders')
    //     navigate("/orders", { replace: true })

    // }
    //)
    // }

    // const handleChange = event => {
    //     setDisabled(event.empty);
    //     setError(event.error ? event.error.message : "")
    // }

    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>
                    Checkout(<Link to="/checkout">{basket?.length} items</Link>)
                </h1>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_details'>
                        <div className='payment_priceContainer'>
                            <h1 className='pay_on_delivery'>Pay on Delivery</h1>  {/*onChange will handle the changes in card elements*/}
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total:{value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            >
                            </CurrencyFormat>

                        </div>

                    </div>
                </div>

                


                <div className='payment_section'>
                    
                    <div className='payment_address'>
                       
                        <div> <DeliveryForm /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment



//stripe that is assigned the value returned by calling the useStripe() hook. The stripe constant can then be used throughout the component to access the Stripe.js API and interact with the Stripe payment platform.

//The useElements() hook is used to retrieve an instance of the Stripe Elements object, which is used to create payment input fields such as card number, expiration date, and CVV code. The Elements object also provides methods for handling input validation and formatting, as well as other Stripe API functionality related to payment inputs.

//The useEffect() hook is a built-in hook in React that allows functional components to perform side effects, such as fetching data from an API, subscribing to events, or updating the DOM.

//CardElement object, which confirms the payment with Stripe and returns a payment intent object.
























