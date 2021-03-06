import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Map from './map'

/**
 * COMPONENT
 */
export const UserHome = props => {
  return (
    <div>
      <Map />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
