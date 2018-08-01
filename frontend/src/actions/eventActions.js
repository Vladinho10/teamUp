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
          console.log(DataArr);
          dispatch(getSuggestedEventsSuccess(DataArr, sugNum));
        })
        .catch(err => console.log(err));
    } else {
      sugNum = 0;
      const f = fetch(`/api/events/suggested$${sugNum}`, options);
      f.then(res => res.json())
        .then((DataArr) => {
          console.log(DataArr);
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
      console.log('tttttttttttttttttttttttttttttttttt', ownNum);
      f.then((res) => {
        return res.json();
      })
        .then((DataObj) => {
          return dispatch(getOwnEventsSuccess(DataObj, ownNum));
        })
        .catch(err => console.log(err));
    } else {
      ownNum = 0;
      const f = fetch('/api/events/own_events$0', options);
      f.then((res) => {
        return res.json();
      })
        .then((DataObj) => {
          return dispatch(getOwnEventsSuccess(DataObj, 0));
        })
        .catch(err => console.log(err));
    }
  };
};


const getAttendingEventsSuccess = data => ({
  type: 'ATTENDING_EVENTS',
  attendingEventsObj: data
});

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
    let t = isScroll;
    const f = fetch(`/api/events/attending$${t}`, options);
    console.log(999);
    if (t !== 0) t += 1;
    f.then((res) => {
      return res.json();
    }).then((DataArr) => {
      console.log('DataObj in actions attending', DataArr);
      return dispatch(getAttendingEventsSuccess(DataArr));
    }).catch(err => console.log(err));
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
      // console.log('event from serverik', data);
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
  return (dispatch) => {
    const data = { ...editingData, _id };
    const options = {
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json ' }
    };
    const f = fetch(`/api/events/${_id}`, options);
    f.then((res) => {
      return res.json();
    }).then((editedDataObj) => {
      return dispatch(editEventSuccess(editedDataObj));
    }).catch(err => console.log(err));
  };
};

const deleteEventSuccess = _id => ({
  type: 'DELETE_EVENT',
  deletingEventObj_id: _id
});

export const deleteEvent = (_id) => {
  console.log('---hasanq delete event action');
  return (dispatch) => {
    const data = { _id };
    const options = {
      credentials: 'include',
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json ' }
    };
    const f = fetch(`/api/events/${_id}`, options);
    f.then((res) => {
      return res.json();
    }).then((deletedDataObj_id) => {
      return dispatch(deleteEventSuccess(deletedDataObj_id));
    }).catch(err => console.log(err));
  };
};
