export default (state = [], action) => {
  // console.log('action', action.ownEventsArr);
  switch (action.type) {
    case 'ALL_EVENTS':
      return action.allEventsArr;
    case 'OWN_EVENTS':
      // console.log('action.ownEventsObj.own_events', action.ownEventsObj.own_events);
      return action.ownEventsObj.own_events; // arr
    case 'GO_EVENTS':
      return action.goEventsArr;
    case 'ADD_EVENT':
      return [...state, action.event];
    case 'EDIT_EVENT':
      return state.map((el) => {
        return el._id !== action.editingEventObj._id ? el : action.editingEventObj;
      });
      // return editedDataArr;
    case 'DELETE_EVENT':
      return state.filter((el) => {
        return el._id !== action.deletingEventObj_id;
      });
      // return deletedDataArr;
    default:
      return state;
  }
};
