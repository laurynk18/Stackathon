import React from 'react'
import {Marker} from 'react-map-gl'

export const Pin = props => {
  const {mapRef, handleOnMarkerClick, place} = props
  //console.log('PLACE IN PIN', place)
  const latitude = place.location[1]
  const longitude = place.location[0]

  //if place.categoryId === 1 ? include restaurant icon

  return (
    <Marker
      mapRef={mapRef}
      key={place.id}
      latitude={latitude}
      longitude={longitude}
      onClick={() => handleOnMarkerClick(place)}
    />
  )
}
