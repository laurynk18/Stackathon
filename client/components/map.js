import React, {useState, useRef, useCallback} from 'react'
import ReactMapGl, {Popup} from 'react-map-gl'
//import Geocoder from 'react-mapbox-gl-geocoder'
import Geocoder from 'react-map-gl-geocoder'
//import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
//import 'mapbox-gl/dist/mapbox-gl.css'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const token =
  'pk.eyJ1IjoibGF1cnluYXByOTkiLCJhIjoiY2trZThhNzRhMDN2NjMwcGVjMHA4bG5kZSJ9.adHA-Pgnztq28O9TKW0SHQ'

// const queryParams = {
//   country: 'us',
// }

export function Map() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '80vh',
    latitude: 40.78343,
    longitude: -73.96625,
    zoom: 11
  })
  const mapRef = useRef()

  //Receives selected item and the viewport to set for the selected item
  // const onSelected = useCallback((nextViewport, item) => {
  //   setViewport(nextViewport)
  //   console.log('Selected item:', item)
  // })

  const handleViewportChange = useCallback(
    newViewport => setViewport(newViewport),
    []
  )

  // locates search result on map
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
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          onResult={handleOnResult}
          mapboxApiAccessToken={token}
          countries="us"
          marker="true"
          position="top-left"
        />
      </ReactMapGl>
    </div>
  )
}

// const mapStateToProps = state => ({
// })

// const mapDispatchToProps = (dispatch, {history}) => {
// }

//export default connect(mapStateToProps, mapDispatchToProps)(Map)
