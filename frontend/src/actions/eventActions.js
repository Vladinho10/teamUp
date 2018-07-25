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

const getOwnEventsSuccess = data => ({
  type: 'MY_EVENTS',
  myEventsArr: data
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
    const f = fetch('/api/own_events', options);
    f.then((res) => {
      console.log('resssssssssssssssssssssss', res);
      console.log('resssssssssssssssssssssss', res.json());
      return res.json();
    })
      .then(DataArr => dispatch(getOwnEventsSuccess(DataArr)))
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

const addEventSuccess = event => ({
  type: 'ADD_EVENT',
  event
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
      console.log(data, 'event from serverik');
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
