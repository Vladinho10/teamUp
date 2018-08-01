const getSuggestedEventsSuccess = data => ({
  type: 'SUGGESTED_EVENTS',
  suggestedEventsObj: data
});

export const getSuggestedEvents = (count) => {
  return (dispatch) => {
    const options = {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    };
    let sug = count;
    const f = fetch(`/api/events/suggested$${sug}`, options);
    if (sug !== 0) sug += 1;
    f.then(res => res.json())
      .then((DataArr) => {
        console.log(DataArr);
        dispatch(getSuggestedEventsSuccess(DataArr));
      })
      .catch(err => console.log(err));
  };
};

const getOwnEventsSuccess = (data, num) => ({ // obj,vori key-i poxum e store-y
  type: 'OWN_EVENTS',
  ownEventsObj: data,
  num
});

let t = 1;
let temp = 0;
export const getOwnEvents = (count) => {
  return (dispatch) => {
    const options = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json ',
        Accept: 'application/json'
      }
    };
    if (count === false) {
      t = 0;
      const f = fetch(`/api/events/own_events$${t}`, options);
      console.log('tttttttttttttttttttttttttttttttttt', t);
      f.then((res) => {
        return res.json();
      })
        .then((DataObj) => {
          return dispatch(getOwnEventsSuccess(DataObj, t));
        })
        .catch(err => console.log(err));
    } else {
      temp++;
      const f = fetch(`/api/events/own_events$${temp}`, options);
      console.log('tttttttttttttttttttttttttttttttttt', temp);
      f.then((res) => {
        return res.json();
      })
        .then((DataObj) => {
          if (!DataObj.events.length) temp--;
          return dispatch(getOwnEventsSuccess(DataObj, temp));
        })
        .catch(err => console.log(err));
    }

  };
};


const getAttendingEventsSuccess = data => ({
  type: 'ATTENDING_EVENTS',
  attendingEventsObj: data
});

export const getAttendingEvents = (count) => {
  return (dispatch) => {
    const options = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json ',
        Accept: 'application/json'
      }
    };
    let t = count;
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

const addEventSuccess = data => ({
  type: 'ADD_EVENT',
  addEventObj: data
});

export const addEvent = (payload) => {
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
