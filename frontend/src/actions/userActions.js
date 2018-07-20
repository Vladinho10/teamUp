const addUserSuccess = data => ({
  type: 'ADD_USER',
  userObj: data
});

export const addUser = (payload) => {
  return (dispatch) => {
    const data = payload;
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json ' }
    };
    const f = fetch('/api/users', options);
    f.then((res) => {
      return res.json();
    }).then((DataObj) => {
      return dispatch(addUserSuccess(DataObj));
    }).catch(err => console.log(err));
  };
};

const editUserSuccess = data => ({
  type: 'ADD_USER',
  userObj: data
});

export const editUser = (payload) => {
  return (dispatch) => {
    const data = { user: payload };
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json ' }
    };
    const f = fetch('/api/users', options);
    f.then((res) => {
      return res.json();
    }).then((DataObj) => {
      return dispatch(editUserSuccess(DataObj));
    }).catch(err => console.log(err));
  };
};
