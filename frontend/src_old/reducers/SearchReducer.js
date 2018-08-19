export default (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_RESULTS':
      return [...action.result.events, ...action.result.users];

    default:
      return state;
  }
};
