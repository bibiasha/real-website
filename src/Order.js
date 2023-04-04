import React from 'react'
import './Order.css'
import moment from 'moment/moment'

function Order({order}) {
  return (
    <div className='order'>
      <h2>Order</h2>
      <p>{moment.normalizeUnits(order.data.created).format('MMMM Do YYYY, h:mm a')}</p>
    </div>
  )
}

export default Order


