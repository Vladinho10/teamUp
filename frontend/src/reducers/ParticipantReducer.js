export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PARTICIPANT':
      console.log({ ...state, ...action.participants_count }, '{ ...state, ...action.participants_count }');
      return { ...state, ...action.participants_count };
    case 'DELETE_PARTICIPANT':
      return { ...state, ...action.participants_count };
    default:
      return state;
  }
};
