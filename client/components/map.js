import React, {Component} from 'react'
import ReactMapGl, {NavigationControl, FlyToInterpolator} from 'react-map-gl'
import {fetchPlaces} from '../store/place'
import Geocoder from 'react-map-gl-geocoder'
import {connect} from 'react-redux'
import {Pin} from './pin'
import Sidebar from './sidebar'
import {InfoPopup} from './popup'
import AddPlacePopup from './addPlacePopup'

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
        width: '99vw',
        height: '84vh',
        latitude: 40.78343,
        longitude: -73.96625,
        zoom: 11
      },
      selectedPlace: null,
      searchResult: null,
      toggleRestaurant: true,
      toggleCafe: true,
      toggleBar: true
    }
    this.handleGeocoderViewportChange = this.handleGeocoderViewportChange.bind(
      this
    )
    this.handleViewportChange = this.handleViewportChange.bind(this)
    this.handleOnResult = this.handleOnResult.bind(this)
    this.handleOnMarkerClick = this.handleOnMarkerClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.toggleState = this.toggleState.bind(this)
  }

  mapRef = React.createRef()

  componentDidMount() {
    this.props.loadPlaces()
  }

  handleViewportChange = viewport => {
    this.setState(prevState => ({
      viewport: {...prevState.viewport, ...viewport}
    }))
  }

  //locates search result on map
  handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = {transitionDuration: 1000}
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }
  //search result
  handleOnResult = result => {
    console.log('result: ', result)
    console.log('result center: ', result.result.center)
    console.log('result name: ', result.result.text)
    console.log('result address: ', result.result.place_name)
    this.setState({
      searchResult: result
    })
  }
  //marker click
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
  //close pop-up
  handleClose = () => {
    this.setState({
      selectedPlace: null,
      searchResult: null
    })
  }

  toggleState = evt => {
    console.log(this.state['toggle' + evt.target.name])
    this.setState({
      ['toggle' + evt.target.name]: evt.target.checked
    })
  }

  render() {
    let placesArr
    if (Array.isArray(this.props.places) && this.props.places.length > 0) {
      // placesArr = this.props.places
      placesArr = this.props.places.filter(
        place => this.state['toggle' + place.category.category]
      )
    }
    //   if (this.state.searchResult){
    //   console.log('DUPLICATE EXIST?-->', placesArr.filter(place => place.name === this.state.searchResult.result.text).length)}
    // }
    return (
      <div>
        <Sidebar
          handleOnMarkerClick={this.handleOnMarkerClick}
          toggleState={this.toggleState}
        />
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
              ))
            : ''}
          {this.state.selectedPlace && (
            <InfoPopup
              mapRef={this.mapRef}
              selectedPlace={this.state.selectedPlace}
              handleClose={this.handleClose}
            />
          )}
          {this.state.searchResult &&
            (!placesArr ||
              !placesArr.filter(
                place => place.name === this.state.searchResult.result.text
              ).length) && (
              <AddPlacePopup
                mapRef={this.mapRef}
                searchResult={this.state.searchResult}
                handleClose={this.handleClose}
              />
            )}
          <Geocoder
            mapRef={this.mapRef}
            onResult={this.handleOnResult}
            placeholder="Search to pin!"
            onViewportChange={this.handleGeocoderViewportChange}
            mapboxApiAccessToken={token}
            countries="us"
            marker={false}
            // position="top-right"
          />
          <NavigationControl style={navControlStyle} />
        </ReactMapGl>
        ) : <div>Loading...</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  places: state.place.all
})

const mapDispatchToProps = dispatch => ({
  loadPlaces: () => dispatch(fetchPlaces())
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)
