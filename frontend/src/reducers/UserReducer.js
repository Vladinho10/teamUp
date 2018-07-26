export default (state = { user: {} }, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...action.userData
      };
    case 'EDIT_USER':
      return {
        events: state.events,
        user: {
          ...state.user,
          ...action.userObj
        }
      };

    case 'ADD_NUMBER':
      return state;

    case 'EDIT_NUMBER':
      return state;

    default:
      return state;
  }
};
