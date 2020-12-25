import React from 'react'
import StripeChckout from 'react-stripe-checkout'

const Payments = () => {

  return (
    <StripeChckout
      amount={500}
      token={token => console.log(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    />
  )
}

export default Payments
