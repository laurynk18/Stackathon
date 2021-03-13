import React from 'react'
import {Popup} from 'react-map-gl'

export const InfoPopup = props => {
  const {mapRef, selectedPlace, handleClose} = props
  return (
    <Popup
      mapRef={mapRef}
      latitude={selectedPlace.location[1]}
      longitude={selectedPlace.location[0]}
      closeButton={true}
      closeOnClick={false}
      onClose={() => handleClose()}
      className="mapboxgl-popup"
    >
      <div>
        <h3>{selectedPlace.name}</h3>
        <p>Address: {selectedPlace.address}</p>
        <p>Rating: {'⭐'.repeat(selectedPlace.rating)}</p>
        {selectedPlace.note && <p>Notes: {selectedPlace.note}</p>}
        {selectedPlace.tag &&
          selectedPlace.tag.map(tag => (
            <p key={tag} className="place-tag">
              {tag}
            </p>
          ))}
      </div>
    </Popup>
  )
}
