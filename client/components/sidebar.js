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
    this.handleListToggle = this.handleListToggle.bind(this)
  }

  componentDidMount() {
    this.props.loadPlaces()
  }
  handleListToggle = category => {
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
        <h1 className="sidenav-header">Click to navigate!</h1>
        <div className="sidenav-subheader">
          <button
            type="button"
            className={
              this.state.showRestaurants
                ? 'dropdown-btn dropdown-selected'
                : 'dropdown-btn'
            }
            onClick={() => this.handleListToggle('restaurants')}
          >
            Restaurants 🍕
          </button>
          <input
            type="checkbox"
            id="restaurant"
            name="Restaurant"
            defaultChecked={true}
            onChange={this.props.toggleState}
          />
        </div>
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
        <div className="sidenav-subheader">
          <button
            type="button"
            className={
              this.state.showCafes
                ? 'dropdown-btn dropdown-selected'
                : 'dropdown-btn'
            }
            onClick={() => this.handleListToggle('cafes')}
          >
            Cafes ☕
          </button>
          <input
            type="checkbox"
            id="cafe"
            name="Cafe"
            defaultChecked={true}
            onChange={this.props.toggleState}
          />
        </div>
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
        <div className="sidenav-subheader">
          <button
            type="button"
            className={
              this.state.showBars
                ? 'dropdown-btn dropdown-selected'
                : 'dropdown-btn'
            }
            onClick={() => this.handleListToggle('bars')}
          >
            Bars 🍷
          </button>
          <input
            type="checkbox"
            id="bar"
            name="Bar"
            defaultChecked={true}
            onChange={this.props.toggleState}
          />
        </div>
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
  places: state.place.all
})

const mapDispatchToProps = dispatch => ({
  loadPlaces: () => dispatch(fetchPlaces())
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
