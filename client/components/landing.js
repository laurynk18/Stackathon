import React from 'react'
import {Link} from 'react-router-dom'

export function Landing() {
  return (
    <div>
      <h1 className="main-header">PinEat</h1>
      <h2 className="header">
        <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link> to
        pin your faves!
      </h2>
    </div>
  )
}
