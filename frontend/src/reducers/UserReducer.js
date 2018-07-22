export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...action.userData
      };

    case 'ADD_NUMBER':
      return state;

    case 'EDIT_NUMBER':
      return state;

    default:
      return state;
  }
};
