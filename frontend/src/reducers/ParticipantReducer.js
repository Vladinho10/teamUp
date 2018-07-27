export default (state = {}, action) => {
  console.log(state, action, 'state and action in ParticipantReducer');
  switch (action.type) {
    case 'ADD_PARTICIPANT':

      return { ...state, ...action.participants_count };
    case 'DELETE_PARTICIPANT':
      return { ...state, ...action.participants_count };
    default:
      return state;
  }
};
