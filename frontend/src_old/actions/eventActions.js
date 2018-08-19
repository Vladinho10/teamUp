const getSuggestedEventsSuccess = (data, num) => ({
  type: 'SUGGESTED_EVENTS',
  suggestedEventsObj: data,
  num
});

let sugNum = 0;
export const getSuggestedEvents = (isScroll) => {
  return (dispatch) => {
    const options = {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    };
    if (isScroll) {
      sugNum += 1;
      const f = fetch(`/api/events/suggested$${sugNum}`, options);
      f.then(res => res.json())
        .then((DataArr) => {
          dispatch(getSuggestedEventsSuccess(DataArr, sugNum));
        })
        .catch(err => console.log(err));
    } else {
      sugNum = 0;
      const f = fetch(`/api/events/suggested$${sugNum}`, options);
      f.then(res => res.json())
        .then((DataArr) => {
          dispatch(getSuggestedEventsSuccess(DataArr, sugNum));
        })
        .catch(err => console.log(err));
    }
  };
};

const getOwnEventsSuccess = (data, num) => ({ // obj,vori key-i poxum e store-y
  type: 'OWN_EVENTS',
  ownEventsObj: data,
  num
});

let ownNum = 0;
export const getOwnEvents = (isScroll) => {
  return (dispatch) => {
    const options = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json ',
        Accept: 'application/json'
      }
    };
    if (isScroll) {
      ownNum += 1;
      const f = fetch(`/api/events/own_events$${ownNum}`, options);
      f.then((res) => {
        return res.json();
      })
        .then((DataObj) => {
          return dispatch(getOwnEventsSuccess(DataObj, ownNum));
        })
        .catch(err => console.log(err));
    } else {
      ownNum = 0;
      const f = fetch(`/api/events/own_events$${ownNum}`, options);
      f.then((res) => {
        return res.json();
      })
        .then((DataObj) => {
          return dispatch(getOwnEventsSuccess(DataObj, ownNum));
        })
        .catch(err => console.log(err));
    }
  };
};


const getAttendingEventsSuccess = (data, num) => ({
  type: 'ATTENDING_EVENTS',
  attendingEventsObj: data,
  num
});

let attNum = 0;
export const getAttendingEvents = (isScroll) => {
  return (dispatch) => {
    const options = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json ',
        Accept: 'application/json'
      }
    };
    if (isScroll) {
      attNum += 1;
      const f = fetch(`/api/events/attending$${attNum}`, options);
      f.then((res) => {
        return res.json();
      }).then((DataObj) => {
        return dispatch(getAttendingEventsSuccess(DataObj, attNum));
      }).catch(err => console.log(err));
    } else {
      attNum = 0;
      const f = fetch(`/api/events/attending$${attNum}`, options);
      f.then((res) => {
        return res.json();
      }).then((DataObj) => {
        return dispatch(getAttendingEventsSuccess(DataObj, attNum));
      }).catch(err => console.log(err));
    }
  };
};

const addEventSuccess = (data, num) => ({
  type: 'ADD_EVENT',
  addEventObj: data,
  num
});

export const addEvent = (payload, isScroll) => {
  return (dispatch) => {
    let options;
    if (payload instanceof FormData) {
      options = {
        credentials: 'include',
        method: 'POST',
        body: payload,
      };
    } else {
      options = {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ data: payload }),
        headers: { 'Content-Type': 'application/json ' }
      };
    }
    const f = fetch('/api/create_event', options);
    f.then((res) => {
      return res.json();
    }).then((data) => {
      console.log('event from serverik', data);
      return dispatch(addEventSuccess(data.event));
    }).catch(err => console.log(err));
  };
};

const editEventSuccess = data => ({
  type: 'EDIT_EVENT',
  editingEventObj: data
});

export const editEvent = (editingData, _id) => {
  console.log('---hasanq edit event');
  console.log(_id, '_id');
  console.log(editingData, 'editingData');
  return (dispatch) => {
    let options;
    if (editingData instanceof FormData) {
      options = {
        credentials: 'include',
        method: 'PUT',
        body: editingData,
      };
    } else {
      options = {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify({ data: editingData }),
        headers: { 'Content-Type': 'application/json ' }
      };
    }
    const f = fetch(`/api/change_event/${_id}`, options);
    f.then((res) => {
      return res.json();
    }).then((editedDataObj) => {
      console.log(editedDataObj, 'editedDataObj');
      // return dispatch(editEventSuccess(editedDataObj));
    }).catch(err => console.log(err));
  };
};

const deleteEventSuccess = _id => ({
  type: 'DELETE_EVENT',
  deletingEventObj_id: _id
});

export const deleteEvent = (_id) => {
  console.log('---hasanq delete event action');
  console.log(_id);
  return (dispatch) => {
    const data = { _id };
    const options = {
      credentials: 'include',
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json ' }
    };
    const f = fetch(`/api/change_event/${_id}`, options);
    f.then((res) => {
      return res.json();
    }).then((status) => {
      console.log(status, 'killed!!!!');
      // return dispatch(deleteEventSuccess(deletedDataObj_id));
    }).catch(err => console.log(err));
  };
};


const JoinUserSuccess = (participants_count, id) => ({
  type: 'JOIN_EVENT',
  participants_count: participants_count.max_members,
  id
});

export const JoinUser = (ev_id) => {
  console.log(ev_id, 'event_id');
  return (dispatch) => {
    const data = {
      ev_id,
      action: 'add'
    };
    const options = {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' }
    };

    fetch('/api/add_or_delete_participant', options)
      .then((res) => {
        return res.json();
      }).then((participants_count) => {
        console.log(participants_count, 'participants_count');
        return dispatch(JoinUserSuccess(participants_count, ev_id));
      }).catch(err => console.log(err));
  };
};

const unJoinUserSuccess = (participants_count, id) => ({
  type: 'UNJOIN_EVENT',
  participants_count,
  id
});

export const unJoinUser = (ev_id) => {
  console.log(ev_id, 'ev_id');
  return (dispatch) => {
    const data = {
      ev_id,
      action: 'delete'
    };
    const options = {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' }
    };

    fetch('/api/add_or_delete_participant', options)
      .then((res) => {
        return res.json();
      }).then((participants_count) => {
        console.log(participants_count, 'participants_count');
        return dispatch(unJoinUserSuccess(participants_count, ev_id));
      }).catch(err => console.log(err));
  };
};
