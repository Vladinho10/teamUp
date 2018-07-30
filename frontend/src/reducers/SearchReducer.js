export default (state = [], action) => {
  // console.log(state, 'search reducer state');
  // console.log(action, 'search reducer action');
  switch (action.type) {
    case 'GET_ALL_RESULTS':
      return [...action.result.events, ...action.result.users];

    default:
      return state;
  }
};
