import React from 'react'
import { connect } from 'react-redux'
import StripeChckout from 'react-stripe-checkout'
import * as action from '../actions'

const Payments = ({handleToken}) => {

  return (
    <StripeChckout
      name='Feedback collection'
      description='$5 for 5 email credits'
      amount={500}
      token={token => handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className='btn'>Add Credits</button>
    </StripeChckout>
  )
}

export default connect(null, action)(Payments)
