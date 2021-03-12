import React, {useState, useRef, useEffect, useCallback} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ReactMapGl, {Marker, Popup, NavigationControl} from 'react-map-gl'
import {fetchPlaces} from '../store/place'
//import Geocoder from 'react-mapbox-gl-geocoder'
import Geocoder from 'react-map-gl-geocoder'
//import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
//import 'mapbox-gl/dist/mapbox-gl.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Pin} from './pin'
import Pins from './pins'

const token =
  'pk.eyJ1IjoibGF1cnluYXByOTkiLCJhIjoiY2trZThhNzRhMDN2NjMwcGVjMHA4bG5kZSJ9.adHA-Pgnztq28O9TKW0SHQ'

const navControlStyle = {
  right: 30,
  bottom: 10
}

//get data from db, pass as props to sidebar, marker, popup

export function Map() {
  const mapRef = useRef()
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '80vh',
    latitude: 40.78343,
    longitude: -73.96625,
    zoom: 11
  })

  //markers
  //const [selectedPlace, setSelectedPlace] = useState(null)

  // fetch places
  const places = useSelector(state => state.place)
  const [userPlaces, setUserPlaces] = useState(places)
  const dispatch = useDispatch()
  useEffect(() => dispatch(fetchPlaces()), [dispatch])
  console.log(places)

  //Receives selected item and the viewport to set for the selected item
  // const onSelected = useCallback((nextViewport, item) => {
  //   setViewport(nextViewport)
  //   console.log('Selected item:', item)
  // })

  const handleViewportChange = useCallback(
    newViewport => setViewport(newViewport),
    []
  )

  //locates search result on map
  const handleGeocoderViewportChange = useCallback(newViewport => {
    const geocoderDefaultOverrides = {transitionDuration: 1000}

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides
    })
  }, [])

  //handles search result
  const handleOnResult = useCallback(result => {
    console.log(result)
  })
  return (
    <div>
      {/* <Geocoder
        ref={mapRef}
        viewport={viewport}
        onSelected={onSelected}
        mapboxApiAccessToken={token}
        hideOnSelect={true}
        queryParams={queryParams}
        position="top-right"
        value=""
      /> */}
      <ReactMapGl
        ref={mapRef}
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={token}
        mapStyle="mapbox://styles/mapbox/streets-v10"
      >
        <Marker latitude={40.785091} longitude={-73.968285} />
        <Pins />
        {places.length ? (
          places.map(place => (
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
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          onResult={handleOnResult}
          mapboxApiAccessToken={token}
          countries="us"
          marker={true} //or render new Marker --> onResult
          position="top-right"
        />
        <NavigationControl style={navControlStyle} />
      </ReactMapGl>
    </div>
  )
}

// const mapStateToProps = state => ({
// })

// const mapDispatchToProps = (dispatch, {history}) => {
// }

//export default connect(mapStateToProps, mapDispatchToProps)(Map)
