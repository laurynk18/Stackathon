import axios from 'axios'

/*
 * ACTION TYPES
 */
export const GET_PLACES = 'GET_PLACES'

/*
* ACTION CREATORS
*/
const getPlaces = places => ({type: GET_PLACES, places})

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

//INITIAL STATE
let initialState = []

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLACES:
      return action.places
    default:
      return state
  }
}
