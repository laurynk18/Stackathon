import React, {Component} from 'react'
import {Popup} from 'react-map-gl'
import {addPlace} from '../store/place'
import {connect} from 'react-redux'

const defaultState = {
  placeInfo: {
    name: '',
    address: '',
    rating: 1,
    note: '',
    category: '',
    tag: '',
    location: []
  }
}

class AddPlacePopup extends Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  //track submitted in componentDidUpdate --> render "Added!"

  componentDidMount() {
    this.setState({
      placeInfo: {
        name: this.props.searchResult.result.text,
        address: this.props.searchResult.result.place_name,
        location: this.props.searchResult.result.center
      }
      //submitted: false,
    })
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.searchResult.result.text !== this.props.searchResult.result.text
    ) {
      console.log(
        'COMP DID UPDATE PREV PROPS!!-->',
        prevProps.searchResult.result.text
      )
      console.log(
        'COMP DID UPDATE NOW PROPS!!-->',
        this.props.searchResult.result.text
      )
      this.setState({
        placeInfo: {
          name: this.props.searchResult.result.text,
          address: this.props.searchResult.result.place_name,
          location: this.props.searchResult.result.center,
          rating: 1,
          category: '',
          tag: '',
          note: ''
        }
      })
    }
  }

  handleChange(evt) {
    this.setState({
      placeInfo: {
        ...this.state.placeInfo,
        [evt.target.name]: evt.target.value
      }
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.createPlace({
      ...this.state.placeInfo,
      rating: +this.state.placeInfo.rating,
      tag: this.state.placeInfo.tag && this.state.placeInfo.tag.split(',')
    })
    //this.setState({submitted: true})
  }

  render() {
    const {mapRef, searchResult, handleClose} = this.props
    const {handleSubmit, handleChange} = this
    return (
      <Popup
        mapRef={mapRef}
        latitude={searchResult.result.center[1]}
        longitude={searchResult.result.center[0]}
        closeButton={true}
        closeOnClick={false}
        onClose={() => handleClose()}
        className="mapboxgl-popup"
      >
        <form id="create-place-form" onSubmit={handleSubmit}>
          <h3>Pin it!</h3>
          <h3>{searchResult.result.text}</h3>
          <p>Address: {searchResult.result.place_name}</p>

          <label htmlFor="rating">Rating:</label>
          <input
            name="rating"
            type="number"
            onChange={handleChange}
            value={this.state.placeInfo.rating}
            min="1"
            max="5"
            required
          />

          <label htmlFor="note">Note:</label>
          <textarea
            type="text"
            name="note"
            onChange={handleChange}
            value={this.state.placeInfo.note}
          />

          <label htmlFor="tag">Tags (separate by comma):</label>
          <input
            name="tag"
            placeholder="A, B, C"
            onChange={handleChange}
            value={this.state.placeInfo.tag}
          />

          <label htmlFor="category">Category:</label>
          <select
            name="category"
            onChange={handleChange}
            value={this.state.placeInfo.category}
            required
          >
            <option disabled value="">
              Select
            </option>
            <option value="Restaurant">Restaurant</option>
            <option value="Cafe">Cafe</option>
            <option value="Bar">Bar</option>
          </select>

          <button type="submit">Submit</button>
        </form>
      </Popup>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    createPlace: placeInfo => dispatch(addPlace(placeInfo))
  }
}

export default connect(null, mapDispatch)(AddPlacePopup)
