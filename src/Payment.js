import React from 'react'
import { useState } from 'react';
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom'
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { db } from './firebase';
import axios from 'axios';

function Payment() {
    const navigate = useNavigate();   
    const [{ basket, user }, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements(); 

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        //generate the special stripe secret  which allow to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //stripe expect the total in a currency subunit
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    console.log("clienSecret", clientSecret)
    console.log("clienSecret", user)


    const handleSubmit = async (event) => {
        event.preventDefault(); {/* event.preventDefault():if the event does not get explicitly handled, its default action should not be taken as it normally would be. */ }
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //no Sequeal data base
            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })            //paymentIntent=payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            // navigate.replace('/orders')
            navigate("/orders", { replace: true })

        })
    }

    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")
    }

    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>
                    Checkout(<Link to="/checkout">{basket?.length} items</Link>)
                </h1>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>123 vasco,</p>
                        <p>Goa, India</p>
                    </div>
                </div>

                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_details'>
                        {/*stripe*/}
                        <form onSubmit={handleSubmit}>               {/*onSubmit will submit the details. basically it is used to do some fancy stuff*/}
                            <CardElement onChange={handleChange} />  {/*cardElement will display card details like card nos expiry etc*/}
                            <div className='payment_priceContainer'>  {/*onChange will handle the changes in card elements*/}
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total:{value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                >
                                </CurrencyFormat>
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}    {/* if error occur show it related to card */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
