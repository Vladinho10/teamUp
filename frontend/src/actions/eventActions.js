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
    f.then((res) => {
      return res.json();
    }).then((DataArr) => {
      return dispatch(getAllEventsSuccess(DataArr));
    }).catch(err => console.log(err));
  };
};

const getMyEventsSuccess = (data, _id) => ({
  type: 'MY_EVENTS',
  myEventsArr: data
});

export const getMyEvents = (_id) => {
  return (dispatch) => {
    const options = {
      headers: { 'Content-Type': 'application/json ' }
    };
    const f = fetch(`/api/events/${_id}`, options);
    f.then((res) => {
      return res.json();
    }).then((DataArr) => {
      return dispatch(getMyEventsSuccess(DataArr));
    }).catch(err => console.log(err));
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
  eventObj: data
});

export const addEvent = (payload) => {
  return (dispatch) => {
    const data = { event: payload };
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json ' }
    };
    const f = fetch('/api/events', options);
    f.then((res) => {
      return res.json();
    }).then((DataArr) => {
      return dispatch(addEventSuccess(DataArr));
    }).catch(err => console.log(err));
  };
};

const editEventSuccess = data => ({
  type: 'EDIT_EVENT',
  eventObj: data
});

export const editEvent = (payload, _id) => {
  return (dispatch) => {
    const data = { event: payload, _id };
    const options = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json ' }
    };
    const f = fetch(`/api/events${_id}`, options);
    f.then((res) => {
      return res.json();
    }).then((DataArr) => {
      return dispatch(editEventSuccess(DataArr));
    }).catch(err => console.log(err));
  };
};
