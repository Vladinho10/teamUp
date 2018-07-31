const getSuggestedEventsSuccess = data => ({
  type: 'SUGGESTED_EVENTS',
  suggestedEventsObj: data
});

export const getSuggestedEvents = () => {
  return (dispatch) => {
    const options = {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    };
    const f = fetch('/api/events/suggested', options);
    f.then(res => res.json())
      .then((DataArr) => {
        console.log(DataArr);
        dispatch(getSuggestedEventsSuccess(DataArr));
      })
      .catch(err => console.log(err));
  };
};

const getOwnEventsSuccess = data => ({ // obj,vori key-i poxum e store-y
  type: 'OWN_EVENTS',
  ownEventsObj: data
});

export const getOwnEvents = () => {
  return (dispatch) => {
    const options = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json ',
        Accept: 'application/json'
      }
    };
    const f = fetch('/api/events/own_events', options);
    f.then((res) => {
      return res.json();
    })
      .then((DataObj) => {
        console.log('DataObj in actions', DataObj);
        return dispatch(getOwnEventsSuccess(DataObj));
      })
      .catch(err => console.log(err));
  };
};


const getAttendingEventsSuccess = data => ({
  type: 'ATTENDING_EVENTS',
  attendingEventsObj: data
});

export const getAttendingEvents = () => {
  return (dispatch) => {
    const options = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json ',
        Accept: 'application/json'
      }
    };
    const f = fetch('/api/events/attending', options);
    console.log(999);
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
  return (dispatch) => {
    const data = { ...editingData, _id };
    const options = {
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
  return (dispatch) => {
    const data = { _id };
    const options = {
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
