import React, {Component, useState, useRef, useCallback} from 'react'
import ReactMapGl, {Popup} from 'react-map-gl'
import Geocoder from 'react-mapbox-gl-geocoder'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//latitude: 40.78343, longitude: -73.96625, zoom 11
const token =
  'pk.eyJ1IjoibGF1cnluYXByOTkiLCJhIjoiY2trZThhNzRhMDN2NjMwcGVjMHA4bG5kZSJ9.adHA-Pgnztq28O9TKW0SHQ'
//mapStyle="mapbox://styles/mapbox/streets-v10"

const queryParams = {
  country: 'us'
}

export function Map() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 40.78343,
    longitude: -73.96625,
    zoom: 11
  })
  const mapRef = useRef()

  //Receives selected item and the viewport to set for the selected item
  const onSelected = useCallback((nextViewport, item) => {
    setViewport(nextViewport)
    console.log('Selected item:', item)
  })

  return (
    <div>
      <Geocoder
        ref={mapRef}
        viewport={viewport}
        onSelected={onSelected}
        mapboxApiAccessToken={token}
        hideOnSelect={true}
        queryParams={queryParams}
        position="top-right"
        placeholder="Search for a location!"
        value=""
      />
      <ReactMapGl
        ref={mapRef}
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={token}
        mapStyle="mapbox://styles/mapbox/streets-v10"
      />
    </div>
  )
}

// const mapStateToProps = state => ({
// })

// const mapDispatchToProps = (dispatch, {history}) => {
// }

//export default connect(mapStateToProps, mapDispatchToProps)(Map)
