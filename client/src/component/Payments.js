import React from 'react'
import StripeChckout from 'react-stripe-checkout'

const Payments = () => {

  return (
    <StripeChckout
      name='Feedback collection'
      description='$5 for 5 email credits'
      amount={500}
      token={token => console.log(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className='btn'>Add Credits</button>
    </StripeChckout>
  )
}

export default Payments
