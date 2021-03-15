import React from 'react'
import {Link} from 'react-router-dom'

export function Landing() {
  return (
    <div className="landing-container">
      <h1 className="logo">
        P<span>i</span>nEAT
      </h1>
      <h2 className="header">
        <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link> to
        pin your faves!
      </h2>
    </div>
  )
}
