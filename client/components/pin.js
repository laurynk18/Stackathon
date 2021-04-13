import React from 'react'
import {Marker} from 'react-map-gl'

export const Pin = props => {
  const {mapRef, handleOnMarkerClick, place} = props
  const latitude = place.location[1]
  const longitude = place.location[0]

  return (
    <Marker
      mapRef={mapRef}
      key={place.id}
      latitude={latitude}
      longitude={longitude}
      onClick={() => handleOnMarkerClick(place)}
    >
      {place.categoryId === 1 ? '🍕' : place.categoryId === 2 ? '☕' : '🍷'}
    </Marker>
  )
}
