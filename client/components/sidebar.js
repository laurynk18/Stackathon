import React, {Component} from 'react'
import {fetchPlaces} from '../store/place'

import {connect} from 'react-redux'

class Sidebar extends Component {
  constructor() {
    super()
    this.state = {
      showRestaurants: false,
      showCafes: false,
      showBars: false
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount() {
    this.props.loadPlaces()
  }
  handleToggle = category => {
    if (category === 'restaurants') {
      this.setState({showRestaurants: !this.state.showRestaurants})
    }
    if (category === 'cafes') {
      this.setState({showCafes: !this.state.showCafes})
    }
    if (category === 'bars') {
      this.setState({showBars: !this.state.showBars})
    }
  }
  handleClickPlace = () => {
    this.setState({})
  }

  render() {
    return (
      <div className="sidenav">
        <button
          type="button"
          className={
            this.state.showRestaurants
              ? 'dropdown-btn dropdown-selected'
              : 'dropdown-btn'
          }
          onClick={() => this.handleToggle('restaurants')}
        >
          Restaurants
        </button>
        {this.state.showRestaurants &&
          this.props.places
            .filter(place => place.categoryId === 1)
            .map(place => {
              return (
                <div className="active" key={place.id}>
                  <button
                    type="button"
                    className="dropdown-place"
                    onClick={() => this.props.handleOnMarkerClick(place)}
                  >
                    <h4>{place.name}</h4>
                  </button>
                </div>
              )
            })}
        <button
          type="button"
          className={
            this.state.showCafes
              ? 'dropdown-btn dropdown-selected'
              : 'dropdown-btn'
          }
          onClick={() => this.handleToggle('cafes')}
        >
          Cafes
        </button>
        {this.state.showCafes &&
          this.props.places
            .filter(place => place.categoryId === 2)
            .map(place => {
              return (
                <div className="active" key={place.id}>
                  <button
                    type="button"
                    className="dropdown-place"
                    onClick={() => this.props.handleOnMarkerClick(place)}
                  >
                    <h4>{place.name}</h4>
                  </button>
                </div>
              )
            })}
        <button
          type="button"
          className={
            this.state.showBars
              ? 'dropdown-btn dropdown-selected'
              : 'dropdown-btn'
          }
          onClick={() => this.handleToggle('bars')}
        >
          Bars
        </button>
        {this.state.showBars &&
          this.props.places
            .filter(place => place.categoryId === 3)
            .map(place => {
              return (
                <div className="active" key={place.id}>
                  <button
                    type="button"
                    className="dropdown-place"
                    onClick={() => this.props.handleOnMarkerClick(place)}
                  >
                    <h4>{place.name}</h4>
                  </button>
                </div>
              )
            })}
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
