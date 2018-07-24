const getAllEventsSuccess = data => ({
  type: 'ALL_EVENTS',
  allEventsArr: data
});

export const getAllEvents = () => {
  return (dispatch) => {
    const options = {
      headers: { 'Content-Type': 'application/json' }
    };
    const f = fetch('/api/events', options);
    f.then(res => res.json())
      .then(DataArr => dispatch(getAllEventsSuccess(DataArr)))
      .catch(err => console.log(err));
  };
};

const getMyEventsSuccess = data => ({
  type: 'MY_EVENTS',
  myEventsArr: data
});

export const getMyEvents = (_id) => {
  return (dispatch) => {
    const options = {
      headers: { 'Content-Type': 'application/json ' }
    };
    const f = fetch(`/api/events/${_id}`, options);
    f.then(res => res.json())
      .then(DataArr => dispatch(getMyEventsSuccess(DataArr)))
      .catch(err => console.log(err));
  };
};


const getGoEventsSuccess = data => ({
  type: 'GO_EVENTS',
  goEventsArr: data
});

export const getGoEvents = (payload, _id) => {
  return (dispatch) => {
    const options = {
      headers: { 'Content-Type': 'application/json ' }
    };
    const f = fetch(`/api/events/${payload}/${_id}`, options);
    f.then((res) => {
      return res.json();
    }).then((DataArr) => {
      return dispatch(getGoEventsSuccess(DataArr));
    }).catch(err => console.log(err));
  };
};

const addEventSuccess = data => ({
  type: 'ADD_EVENT',
  addingEventObj: data
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
    }).then((event) => {
      console.log(event, 'event from serverik');
      return dispatch(addEventSuccess(event));
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
