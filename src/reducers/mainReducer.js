export default (state = {}, action) => {
  switch (action.type) {
    case 'MAIN_ACTION':
      return {
        result: action.payload
      }
    default:
      return state;
  }
}