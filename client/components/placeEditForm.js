import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSinglePlace, updatePlace} from '../store/place'

const defaultState = {
  name: '',
  address: '',
  phone: '',
  rating: 0,
  note: '',
  tag: '',
  category: ''
}

class PlaceEditForm extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = defaultState
  }
  async componentDidMount() {
    console.log('edit form paarams-->', this.props)
    await this.props.loadPlace(this.props.match.params.placeId)
    const {
      name,
      address,
      phone,
      rating,
      note,
      tag,
      categoryId
    } = this.props.place
    this.setState({
      name: name,
      address: address,
      phone: phone || '',
      rating: rating,
      note: note || '',
      tag: tag || '',
      category:
        categoryId === 1 ? 'Restaurant' : categoryId === 2 ? 'Cafe' : 'Bar'
    })
  }
  handleChange(evt) {
    console.log('TAG', this.state.tag)
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.updatePlace({
      ...this.props.place,
      ...this.state,
      rating: +this.state.rating,
      tag: Array.isArray(this.state.tag)
        ? this.state.tag
        : this.state.tag.split(',')
    })
  }
  render() {
    const place = this.props.place
    if (!place) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <form className="place-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
            required
          />
          <br />
          <label htmlFor="address">Address:</label>
          <input
            name="address"
            type="text"
            onChange={this.handleChange}
            value={this.state.address}
            required
          />
          <br />
          <label htmlFor="phone">Phone:</label>
          <input
            name="phone"
            placeholder="XXX-XXX-XXXX"
            type="text"
            onChange={this.handleChange}
            value={this.state.phone}
          />
          <br />
          <label htmlFor="rating">Rating:</label>
          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            onChange={this.handleChange}
            value={this.state.rating}
            required
          />
          <br />
          <label htmlFor="note">Notes:</label>
          <textarea
            name="note"
            type="text"
            onChange={this.handleChange}
            value={this.state.note}
          />
          <br />
          <label htmlFor="tag">Tags (separate by comma):</label>
          <input
            name="tag"
            type="text"
            placeholder="A, B, C"
            onChange={this.handleChange}
            value={this.state.tag}
          />
          <br />

          <label htmlFor="category">Category:</label>
          <select
            name="category"
            onChange={this.handleChange}
            value={this.state.category}
          >
            <option value="Restaurant">Restaurant</option>
            <option value="Cafe">Cafe</option>
            <option value="Bar">Bar</option>
          </select>
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  place: state.place.single
})

const mapDispatchToProps = dispatch => ({
  loadPlace: placeId => dispatch(fetchSinglePlace(placeId)),
  updatePlace: place => dispatch(updatePlace(place))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaceEditForm)
