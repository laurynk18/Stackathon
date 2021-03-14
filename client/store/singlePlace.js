const GET_SINGLE_PLACE = 'GET_SINGLE_PLACE'

const getSinglePlace = place => ({type: GET_SINGLE_PLACE, place})

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
