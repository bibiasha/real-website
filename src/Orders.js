import Order from './Order';
import { useState, useEffect } from "react";
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(
        "https://mr-signboards-default-rtdb.firebaseio.com/customers.json"
      );
      const data = await res.json();
      console.log(data);
      // Convert the object of objects to an array of objects
      const ordersArray = Object.values(data);
      console.log(ordersArray);
      setOrders(ordersArray);
    };

    fetchOrders();
  }, []);

  return (
    <div className='container'>
      {orders.map((order, index) => (
        <div className='details' key={index}>
          {order.customer && (
            <h2>Customer: {order.customer.name}</h2>
          )}
          {order.customer && (
            <p>Phone: {order.customer.phone}</p>
          )}
          {order.customer && (
            <p>Address: {order.customer.address}</p>
          )}
          <div className='products'>
            <Order order={order} />
          </div>
          {order.products && Object.keys(order.products).map((key) => (
            <h3 key={key}>Product: {order.products[key].title}</h3>
          ))}
          
        </div>
      ))}
    </div>
  );
};

export default Orders;
