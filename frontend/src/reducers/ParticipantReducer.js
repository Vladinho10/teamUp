export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      console.log({ ...state }, '{ ...state }');
      return { ...state };
    case 'DELETE_PARTICIPANT':
      return { ...state, ...action.participants_count };
    default:
      return state;
  }
};
