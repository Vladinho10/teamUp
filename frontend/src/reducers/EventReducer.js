export default (state = [], action) => {
  switch (action.type) {
    case 'ALL_EVENT':
      return state;

    case 'MY_EVENT':
      return state;

    case 'GO_EVENT':
      return state;

    case 'ADD_EVENT':
      return [...state, action.event];

    case 'EDIT_EVENT':
      return state;

    case 'DELETE_EVENT':
      return state;

    default:
      return state;
  }
};
