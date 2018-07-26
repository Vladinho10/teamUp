export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      return { ...state };
    case 'DELETE_PARTICIPANT':
      return { ...state };
    default:
      return state;
  }
};
