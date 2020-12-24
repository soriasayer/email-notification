import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import * as actions from '../actions'
import Header from './Header'

const App = ({fetchUser}) => {

  useEffect(() => {
   fetchUser()
  })

  return (
    <div className='container'>
     <BrowserRouter>
      <div>
        <Header/>
      </div>
     </BrowserRouter>
    </div>
  )
}

export default connect(null, actions)(App)
