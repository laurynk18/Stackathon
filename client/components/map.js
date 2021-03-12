import React, {Component} from 'react'
import ReactMapGl, {
  Marker,
  Popup,
  NavigationControl,
  FlyToInterpolator
} from 'react-map-gl'
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
      },
      selectedPlace: null
    }
    this.handleGeocoderViewportChange = this.handleGeocoderViewportChange.bind(
      this
    )
    this.handleViewportChange = this.handleViewportChange.bind(this)
    this.handleOnResult = this.handleOnResult.bind(this)
    this.handleOnMarkerClick = this.handleOnMarkerClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  componentDidMount() {
    this.props.loadPlaces()
    //this.props.loadPlaces().then(this.setState({savedPlaces:this.props.places}))
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

  handleOnMarkerClick = place => {
    this.setState(prevState => ({
      viewport: {
        ...prevState.viewport,
        latitude: place.location[1],
        longitude: place.location[0],
        zoom: 14,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
      },
      selectedPlace: place
    }))
  }

  handleClose = () => {
    this.setState({
      selectedPlace: null
    })
  }

  render() {
    let placesArr
    if (this.props.places.length > 0) {
      placesArr = this.props.places
    }
    return (
      <div>
        <ReactMapGl
          ref={this.mapRef}
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({viewport})}
          mapboxApiAccessToken={token}
          mapStyle="mapbox://styles/mapbox/streets-v10"
        >
          {/* <Marker latitude={40.785091} longitude={-73.968285} /> */}
          {Array.isArray(placesArr)
            ? placesArr.map(place => (
                <Pin
                  mapRef={this.mapRef}
                  key={place.id}
                  place={place}
                  viewport={this.state.viewport}
                  handleOnMarkerClick={this.handleOnMarkerClick}
                />
                // <Marker key={place.id} latitude={place.location[1]} longitude={place.location[0]}/>
              ))
            : ''}
          {this.state.selectedPlace && (
            <Popup
              latitude={this.state.selectedPlace.location[1]}
              longitude={this.state.selectedPlace.location[0]}
              closeButton={true}
              closeOnClick={false}
              onClose={() => this.handleClose()}
              className="mapboxgl-popup"
            >
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
            </Popup>
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
        ) : <div>Loading...</div>
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
