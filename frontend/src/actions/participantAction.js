const addParticipantSuccess = participant => ({
  type: 'ADD_PARTICIPANT',
  participant
});

export const addParticipant = (event_id) => {
  return (dispatch) => {
    const _id = { event_id };
    const options = {
      method: 'POST',
      body: JSON.stringify(_id),
      headers: { 'Content-type': 'application/json' }
    };

    fetch('/api/add_participant', options)
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
  return (dispatch) => {
    const _id = { event_id };
    const options = {
      method: 'DELETE',
      body: JSON.stringify(_id),
      headers: { 'Content-type': 'application/json' }
    };

    fetch('/api/delete_participant', options)
      .then((res) => {
        return res.json();
      }).then((participant) => {
        console.log(participant, 'this participant is removed');
        return dispatch(deleteParticipantSuccess(participant));
      }).catch(err => console.log(err));
  };
};
