export default (state = [], action) => {
  // console.log('action', action.ownEventsArr);
  switch (action.type) {
    case 'ADD_USER':
      console.log();
      return action.userData.suggested;
    case 'SUGGESTED_EVENTS':
      console.log('action.suggestedEventsObj', action.suggestedEventsObj);
      return action.suggestedEventsObj.events;
    case 'OWN_EVENTS':
      console.log('action.ownEventsObj.own_events', action.ownEventsObj);
      return action.ownEventsObj.events;
    case 'ATTENDING_EVENTS':
      console.log('action.attendingEventsObj', action.attendingEventsObj);
      return action.attendingEventsObj.events;
    case 'ADD_EVENT':
      return [...state, action.event];
    // case 'EDIT_EVENT':
    //   return state.map((el) => {
    //     return el._id !== action.editingEventObj._id ? el : action.editingEventObj;
    //   });
    //   // return editedDataArr;
    // case 'DELETE_EVENT':
    //   return state.filter((el) => {
    //     return el._id !== action.deletingEventObj_id;
    //   });
    //   // return deletedDataArr;
    default:
      return state;
  }
};
