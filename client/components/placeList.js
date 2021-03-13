import React, {Component} from 'react'
import {fetchPlaces} from '../store/place'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class PlaceList extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.loadPlaces()
  }

  render() {
    const places = this.props.places || []
    return (
      <div className="place-list">
        {places.map(place => (
          <div key={place.id}>
            <div className="place-list-header">
              <h3>
                {place.name} {'⭐'.repeat(place.rating)}
              </h3>
              <Link to={`/places/${place.id}/edit`}>
                <button type="button">Edit</button>
              </Link>
            </div>
            <h4>Address: {place.address}</h4>
            <h4>Phone number: {place.phone}</h4>
            {place.note && <h4>Notes: {place.note}</h4>}
            {place.tag && (
              <h4>
                Tags:{' '}
                {place.tag.map(tag => (
                  <p key={tag} className="place-list-tag">
                    {tag}
                  </p>
                ))}
              </h4>
            )}
            <hr />
          </div>
        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList)
