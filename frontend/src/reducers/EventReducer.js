// export default (state = [], action) => {
export default (state = {
  sug: [],
  my: [],
  go: []
}, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return { sug: action.userData.suggested };
    case 'SUGGESTED_EVENTS':
      if (action.num === 0) {
        return { sug: action.suggestedEventsObj.events };
      }
      return { ...state, sug: [...state.sug, ...action.suggestedEventsObj.events] };
    case 'OWN_EVENTS':
      if (action.num === 0) {
        return { my: action.ownEventsObj.events };
      }
      return { ...state, my: [...state.my, ...action.ownEventsObj.events] };
    case 'ATTENDING_EVENTS':
      if (action.num === 0) {
        return { go: action.attendingEventsObj.events };
      }
      return { ...state, go: [...state.go, ...action.attendingEventsObj.events] };
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
    case 'JOIN_EVENT': {
      const takenArr = state.sug.filter((el) => {
        console.log('el._iddddddd', el._id, 'aaaaaaaaaaaaaaaaction.ev_id', action.ev_id);
        return el._id !== action.id;
      });
      return { ...state, sug: takenArr };
    }
    case 'UNJOIN_EVENT': {
      const takenArr = state.go.filter((el) => {
        console.log('el._iddddddd', el._id, 'aaaaaaaaaaaaaaaaction.ev_id', action.ev_id);
        return el._id !== action.id;
      });
      return { ...state, go: takenArr };
    }
    default:
      return state;
  }
};
