const addParticipantSuccess = participant => ({
  type: 'ADD_PARTICIPANT',
  participant
});

export const addParticipant = (event_id) => {
  console.log(event_id, 'event_id');
  return (dispatch) => {
    const data = {
      event_id,
      key: 'add'
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' }
    };

    fetch('/api/add_or_delete_participant', options)
      .then((res) => {
        return res.json();
      }).then((participant) => {
        console.log(participant, 'this participant is added');
        return dispatch(addParticipantSuccess(participant));
      }).catch(err => console.log(err));
  };
};

const deleteParticipantSuccess = participant => ({
  type: 'DELETE_PARTICIPANT',
  participant
});

export const deleteParticipant = (event_id) => {
  console.log(event_id, 'event_id');
  return (dispatch) => {
    const data = {
      event_id,
      key: 'delete'
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' }
    };

    fetch('/api/add_or_delete_participant', options)
      .then((res) => {
        return res.json();
      }).then((participant) => {
        console.log(participant, 'this participant is removed');
        return dispatch(deleteParticipantSuccess(participant));
      }).catch(err => console.log(err));
  };
};
