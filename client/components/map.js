import React, {Component} from 'react'
import ReactMapGl, {Marker, Popup, NavigationControl} from 'react-map-gl'
import {fetchPlaces} from '../store/place'
import Geocoder from 'react-map-gl-geocoder'
import {connect} from 'react-redux'
import {Pin} from './pin'

const token =
  'pk.eyJ1IjoibGF1cnluYXByOTkiLCJhIjoiY2trZThhNzRhMDN2NjMwcGVjMHA4bG5kZSJ9.adHA-Pgnztq28O9TKW0SHQ'

const navControlStyle = {
  right: 30,
  bottom: 10
}

//get data from db, pass as props to sidebar, marker, popup

class Map extends Component {
  constructor() {
    super()
    this.state = {
      viewport: {
        width: '100vw',
        height: '80vh',
        latitude: 40.78343,
        longitude: -73.96625,
        zoom: 11
      }
    }
    this.handleGeocoderViewportChange = this.handleGeocoderViewportChange.bind(
      this
    )
    this.handleViewportChange = this.handleViewportChange.bind(this)
    this.handleOnResult = this.handleOnResult.bind(this)
  }
  componentDidMount() {
    this.props.loadPlaces()
  }
  mapRef = React.createRef()
  handleViewportChange = viewport => {
    this.setState(prevState => ({
      viewport: {...prevState.viewport, ...viewport}
    }))
  }

  //locates search result on map
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = {transitionDuration: 1000}

    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }
  handleOnResult(result) {
    console.log(result)
  }
  render() {
    return (
      <div>
        {this.props.places && (
          <ReactMapGl
            ref={this.mapRef}
            {...this.state.viewport}
            onViewportChange={viewport => this.setState({viewport})}
            mapboxApiAccessToken={token}
            mapStyle="mapbox://styles/mapbox/streets-v10"
          >
            {/* <Marker latitude={40.785091} longitude={-73.968285} /> */}
            {this.props.places.length ? (
              this.props.places.map(place => (
                <Pin
                  key={place.id}
                  place={place}
                  latitude={place.location[0]}
                  longitude={place.location[1]}
                />
              ))
            ) : (
              <div>Loading...</div>
            )}
            <Geocoder
              mapRef={this.mapRef}
              onResult={this.handleOnResult}
              onViewportChange={this.handleGeocoderViewportChange}
              mapboxApiAccessToken={token}
              countries="us"
              marker={true} //or render new Marker --> onResult
              position="top-right"
            />
            <NavigationControl style={navControlStyle} />
          </ReactMapGl>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  places: state.place
})

const mapDispatchToProps = dispatch => ({
  loadPlaces: () => dispatch(fetchPlaces())
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)
