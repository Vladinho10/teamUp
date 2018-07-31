export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      return state;
    case 'DELETE_PARTICIPANT':
      return state; // { ...state, ...action.participants_count };
    default:
      return state;
  }
};
