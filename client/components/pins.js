import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Marker} from 'react-map-gl'
import {fetchPlaces} from '../store/place'

class Pins extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }
  componentDidMount() {
    this.props.loadPlaces()
    this.setState({isLoading: false})
  }
  render() {
    console.log('PLACES IN PINS: ', this.props.places)
    const places = this.props.places || []
    const loading = this.state.isLoading
    if (loading) {
      return (
        <div className="pageContainer">
          <h2>Loading...</h2>
        </div>
      )
    } else if (places.length) {
      return places.map(place => (
        <Marker
          key={place.id}
          latitude={place.location[0]}
          longitude={place.location[1]}
        >
          <button type="button">
            <img src="../../marker-icons/marker-blue.png" />
          </button>
        </Marker>
      ))
    }
  }
}

const mapStateToProps = state => {
  return {
    places: state.place
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadPlaces: () => dispatch(fetchPlaces())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pins)
