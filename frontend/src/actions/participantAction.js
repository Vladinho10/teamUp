const addParticipantSuccess = participant => ({
  type: 'ADD_PARTICIPANT',
  participant
});

export const addParticipant = (ev_id) => {
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
        return dispatch(addParticipantSuccess(participants_count));
      }).catch(err => console.log(err));
  };
};

const deleteParticipantSuccess = participant => ({
  type: 'DELETE_PARTICIPANT',
  participant
});

export const deleteParticipant = (ev_id) => {
  console.log(ev_id, 'event_id');
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
        return dispatch(deleteParticipantSuccess(participants_count));
      }).catch(err => console.log(err));
  };
};
