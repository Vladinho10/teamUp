// export default (state = [], action) => {
export default (state = {
  sug: [],
  my: [],
  go: []
}, action) => {
  // console.log('action', action.ownEventsArr);
  switch (action.type) {
    case 'ADD_USER':
      return { sug: action.userData.suggested };
    case 'SUGGESTED_EVENTS':
      if (action.num === 0) {
        return { sug: action.suggestedEventsObj.events };
      }
      return { ...state, sug: [...state.sug, ...action.suggestedEventsObj.events] };
      // console.log('action.suggestedEventsObj', action.suggestedEventsObj);
    case 'OWN_EVENTS':
      if (action.num === 0) {
        return { my: action.ownEventsObj.events };
      }
      return { ...state, my: [...state.my, ...action.ownEventsObj.events] };
    case 'ATTENDING_EVENTS':
      console.log('action.attendingEventsObj', action.attendingEventsObj);
      return action.attendingEventsObj.events;
    case 'ADD_EVENT':
      console.log('state during add', state);
      return { ...state, my: [...state.my, action.addEventObj] };
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
