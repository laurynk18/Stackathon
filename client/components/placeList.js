import React, {Component} from 'react'
import {fetchPlaces, deletePlace} from '../store/place'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class PlaceList extends Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.props.loadPlaces()
    this.setState({
      loading: false
    })
  }

  render() {
    const places = this.props.places || []
    console.log('PLACES IN LIST', places)
    // Loading
    if (this.state.loading) {
      return <div>Loading...</div>
    }
    return (
      <div className="place-list">
        {places.length ? (
          places.map(place => (
            <div key={place.id}>
              <div className="place-list-header">
                <h3>
                  {place.name} {'⭐'.repeat(place.rating)}
                </h3>
                <div className="place-list-btns">
                  <Link to={`/places/${place.id}/edit`}>
                    <button type="button" className="edit-btn">
                      Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => this.props.deletePlace(place)}
                  >
                    Unpin
                  </button>
                </div>
              </div>
              <h4>Address: {place.address}</h4>
              {place.phone && <h4>Phone number: {place.phone}</h4>}
              {place.note && <h4>Notes: {place.note}</h4>}
              {place.tag.length > 0 ? (
                <h4>
                  Tags:{' '}
                  {place.tag.map(tag => (
                    <p key={tag} className="place-list-tag">
                      {tag}
                    </p>
                  ))}
                </h4>
              ) : (
                <p>N/A</p>
              )}
              <hr />
            </div>
          ))
        ) : (
          <div>You have no saved places!</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  places: state.place.all
})

const mapDispatchToProps = dispatch => ({
  loadPlaces: () => dispatch(fetchPlaces()),
  deletePlace: place => dispatch(deletePlace(place))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList)

/* {places.length ? (
  places.map(place => (
    <div key={place.id}>
      <div className="place-list-header">
        <h3>
          {place.name} {'⭐'.repeat(place.rating)}
        </h3>
        <div className='place-list-btns'>
        <Link to={`/places/${place.id}/edit`}>
          <button type="button" className='edit-btn'>Edit</button>
        </Link>
        <button type='button' className='delete-btn' onClick={() => this.props.deletePlace(place)}>
          Unpin
        </button>
        </div>
      </div>
      <h4>Address: {place.address}</h4>
      {place.phone && <h4>Phone number: {place.phone}</h4>}
      {place.note && <h4>Notes: {place.note}</h4>}
      {place.tag.length > 0 ? (
        <h4>
          Tags:{' '}
          {place.tag.map(tag => (
            <p key={tag} className="place-list-tag">
              {tag}
            </p>
          ))}
        </h4>
      ) : <p>N/A</p>}
      <hr />
    </div>
  ))
) : (
  <div>You have no saved places!</div>
)} */
