import React, {Component} from 'react'
import ReactMapGl from 'react-map-gl'
import Geocoder from 'react-mapbox-gl-geocoder'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

//latitude: 40.78343, longitude: -73.96625,

export class Map extends Component {
  constructor() {
    super()
    this.state = {
      viewport: {
        latitude: 40.78343,
        longitude: -73.96625,
        zoom: 11
      }
    }
  }

  componentDidMount() {}
  render() {
    return (
      <div>
        <ReactMapGl
          {...this.state.viewport}
          width="100vw"
          height="100vh"
          mapboxApiAccessToken="pk.eyJ1IjoibGF1cnluYXByOTkiLCJhIjoiY2trZThhNzRhMDN2NjMwcGVjMHA4bG5kZSJ9.adHA-Pgnztq28O9TKW0SHQ"
          mapStyle="mapbox://styles/mapbox/streets-v10"
        />
      </div>
    )
  }
}

// const mapStateToProps = state => ({
// })

// const mapDispatchToProps = (dispatch, {history}) => {
// }

//export default connect(mapStateToProps, mapDispatchToProps)(Map)
