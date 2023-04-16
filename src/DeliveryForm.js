import React from 'react'
import { useState } from 'react'
import firebase from 'firebase/app';
import 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from './StateProvider'
import './DeliveryForm.css'
import CheckoutProduct from './CheckoutProduct';

function DeliveryForm() {
    //const [{ basket, user }, dispatch] = useStateValue();
    const navigate = useNavigate();
    const [{ basket, user }, dispatch] = useStateValue();

    const [details, setDetails] = useState({
        name: '',
        phone: '',
        address: '',
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Do something with the collected data, like send it to a backend API

        const { name, phone, address } = details;

        const products = basket.map(item => ({
            id: item.id,
            title: item.title,
            image: item.image,
            price: item.price,
            rating: item.rating,
            quantity: item.quantity // assuming you have a quantity field in your CheckoutProduct component
        }));

        const res = await fetch("https://mr-signboards-default-rtdb.firebaseio.com/customers.json",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customer: {
                        name,
                        phone,
                        address
                    },
                    products
                })
            })
        if (res.ok) {
            dispatch({
                type: 'EMPTY_BASKET'
            })
            navigate("/orders", { replace: true })
        }
    };


    return (
        <div className='container'>
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

            <div className='delivery'>
                <div className='payment_title'>
                    <strong>Delivery Address</strong>
                    <p>{user?.email}</p>
                </div>
                <label htmlFor="name">Name</label>
                <input type='text' placeholder='Name' id="name" onChange={e => setDetails({ ...details, name: e.target.value })} />
                <label htmlFor="phone">Phone Number</label>
                <input type='tel' placeholder='Phone' id="phone" onChange={e => setDetails({ ...details, phone: e.target.value })} pattern="[0-9]{10}"
                    required />
                <label htmlFor="address">Address</label>
                <input type='text' placeholder='Address' id="address" onChange={e => setDetails({ ...details, address: e.target.value })} required />
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default DeliveryForm

