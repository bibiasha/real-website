import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { useNavigate } from "react-router-dom"


function Subtotal() {
  const navigate = useNavigate()
  const [{ basket }, dispatch] = useStateValue();

  const sendSubmit = () => {
    if (basket.length === 0) {
      alert("Your basket is empty. Please add some items to proceed to checkout.");
    } else {
      navigate("/payment");
    }
  }
  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length}, items): <strong>{value}</strong>
            </p>
            <small className='subtotal_gift'>
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={sendSubmit}>Proceed to checkout</button>
    </div>
  )
}

export default Subtotal;
