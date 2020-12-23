import React from 'react'

const Header = () => {
  return (
     <nav>
      <div className="nav-wrapper">
        <a href="#" className="left brand-logo">Feedback</a>
        <ul id="nav-mobile" className="right">
          <li><a>Login With Google</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
