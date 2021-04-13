import axios from 'axios'
import history from '../history'

/*
 * ACTION TYPES
 */
const GET_PLACES = 'GET_PLACES'
const GET_SINGLE_PLACE = 'GET_SINGLE_PLACE'
const ADD_PLACE = 'ADD_PLACE'
const UPDATE_PLACE = 'UPDATE_PLACE'
const DELETE_PLACE = 'DELETE_PLACE'

/*
 * ACTION CREATORS
 */
const getPlaces = places => ({type: GET_PLACES, places})
const getSinglePlace = place => ({type: GET_SINGLE_PLACE, place})
const _addPlace = place => ({type: ADD_PLACE, place})
const _updatePlace = place => ({type: UPDATE_PLACE, place})
const _deletePlace = place => ({type: DELETE_PLACE, place})

/**
 * THUNK CREATORS
 */
export const fetchPlaces = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/places')
      dispatch(getPlaces(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchSinglePlace = placeId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/places/${placeId}`)
      dispatch(getSinglePlace(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addPlace = placeInfo => {
  return async dispatch => {
    try {
      let categoryId
      if (placeInfo.category === 'Restaurant') {
        categoryId = 1
      } else if (placeInfo.category === 'Cafe') {
        categoryId = 2
      } else if (placeInfo.category === 'Bar') {
        categoryId = 3
      }
      const {data} = await axios.post('/api/places', {
        ...placeInfo,
        categoryId: categoryId
      })
      dispatch(_addPlace(data))
    } catch (error) {
      console.log('Error creating place from server', error)
    }
  }
}

export const updatePlace = place => {
  return async dispatch => {
    try {
      let categoryId
      if (place.category === 'Restaurant') {
        categoryId = 1
      } else if (place.category === 'Cafe') {
        categoryId = 2
      } else if (place.category === 'Bar') {
        categoryId = 3
      }
      const {data} = await axios.put(`/api/places/${place.id}`, {
        ...place,
        categoryId: categoryId
      })
      dispatch(_updatePlace(data))
      history.push('/pinned-places')
    } catch (error) {
      console.log('Error updating place from server', error)
    }
  }
}

export const deletePlace = place => {
  return async dispatch => {
    await axios.delete(`/api/places/${place.id}`)
    dispatch(_deletePlace(place))
    history.push('/pinned-places')
  }
}

//INITIAL STATE
let initialState = {
  all: [],
  single: {}
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLACES:
      return {...state, all: action.places}
    case GET_SINGLE_PLACE:
      return {...state, single: action.place}
    case ADD_PLACE:
      return {...state, all: [...state.all, action.place]}
    case UPDATE_PLACE:
      return state.all.map(
        place => (place.id === action.place.id ? action.place : place)
      )
    case DELETE_PLACE:
      return {
        ...state,
        all: state.all.filter(place => place.id !== action.place.id)
      }
    default:
      return state
  }
}
