export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return state;
    case 'REMOVE_EVENT':
      return state;
    case 'EDIT_EVENT':
      return state;
    default:
      return state;
  }
};
