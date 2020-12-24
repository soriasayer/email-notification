import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import * as actions from '../actions'
import Header from './Header'
import Landing from './Landing'

const App = ({fetchUser}) => {

  useEffect(() => {
   fetchUser()
  })

  const Surveys = () => <h2>Dashboard</h2>

  return (
    <div className='container'>
     <BrowserRouter>
      <div>
        <Header/>
        <Route exact path='/' component={Landing}/>
        <Route path='/surveys' component={Surveys}/>
      </div>
     </BrowserRouter>
    </div>
  )
}

export default connect(null, actions)(App)
