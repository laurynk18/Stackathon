import React, {Component} from 'react'
import {fetchPlaces} from '../store/place'

import {connect} from 'react-redux'

class Sidebar extends Component {
  constructor() {
    super()
    this.state = {
      isActive: false
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount() {
    this.props.loadPlaces()
  }
  handleToggle = () => {
    this.setState({isActive: !this.state.isActive})
  }
  handleClickPlace = () => {
    this.setState({})
  }

  render() {
    return (
      <div className="sidenav">
        <button
          type="button"
          className="dropdown-btn"
          onClick={this.handleToggle}
        >
          Restaurants
        </button>
        {this.state.isActive
          ? this.props.places
              .filter(place => place.categoryId === 1)
              .map(place => {
                return (
                  <div className="active" key={place.id}>
                    <h4>{place.name}</h4>
                    <h5>hi</h5>
                  </div>
                )
              })
          : null}
        <button type="button" className="dropdown-btn">
          Cafes
        </button>
        <button type="button" className="dropdown-btn">
          Bars
        </button>
      </div>
    )
  }
}

//onClick header buttons==> ul toggle on/off

const mapStateToProps = state => ({
  places: state.place
})

const mapDispatchToProps = dispatch => ({
  loadPlaces: () => dispatch(fetchPlaces())
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
