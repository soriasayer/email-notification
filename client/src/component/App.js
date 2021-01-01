import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import * as actions from '../actions'
import Dashboard from './Dashboard'
import Header from './Header'
import Landing from './Landing'

const App = ({fetchUser}) => {

  useEffect(() => {
   fetchUser()
  })

  return (
    <div className='container'>
     <BrowserRouter>
      <div>
        <Header/>
        <Route exact path='/' component={Landing}/>
        <Route path='/surveys' component={Dashboard}/>
      </div>
     </BrowserRouter>
    </div>
  )
}

export default connect(null, actions)(App)
