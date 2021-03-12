import React from 'react'
import {Marker} from 'react-map-gl'

export const Pin = props => {
  const {place} = props
  console.log('PLACE IN PIN', place)
  return (
    <Marker
      className="mapboxgl-marker"
      key={place.id}
      latitude={place.location[0]}
      longitude={place.location[1]}
    />
    //   <button type="button">
    //     <img src='../../marker-icons/marker-blue.png' />
    //     <h1>HERE</h1>
    //   </button>
    // </Marker>
  )
}
