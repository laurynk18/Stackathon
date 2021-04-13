import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, email}) => (
  <div className="nav-main">
    <nav>
      {isLoggedIn ? (
        <ul className="navItems">
          <div className="nav-left">
            <li>
              <h1 className="logo">
                <Link to="/home">
                  P<span>i</span>nEat
                </Link>
              </h1>
            </li>
          </div>
          {/* The navbar will show these links after you log in */}
          <div className="nav-right">
            <li>
              <h1>
                <Link to="/pinned-places/">My Pins</Link>
              </h1>
            </li>
            <li>
              <h1>
                <a href="#" style={{float: 'right'}} onClick={handleClick}>
                  Logout
                </a>{' '}
              </h1>
            </li>
          </div>
        </ul>
      ) : (
        <ul className="navItems">
          <div className="nav-left">
            <li>
              <h1 className="logo">
                <Link to="/">
                  P<span>i</span>nEat
                </Link>
              </h1>
            </li>
          </div>
          <div className="nav-right">
            <li style={{float: 'right'}}>
              <Link to="/login">Login</Link>
            </li>
            <li style={{float: 'right'}}>
              <Link to="/signup">Sign Up</Link>
            </li>
          </div>
        </ul>
      )}
    </nav>
    {email ? (
      <div className="welcome-container">
        <p className="welcome">Welcome, {email} 👋 </p>
      </div>
    ) : (
      ''
    )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
