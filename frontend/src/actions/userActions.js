export const addUser = data => ({
  type: 'ADD_USER',
  userData: data
});

const editUserSuccess = data => ({
  type: 'EDIT_USER',
  userObj: data
});

export const editUser = (payload, keyword) => {
  return (dispatch) => {
    let options;
    const bodyObj = {};
    bodyObj[keyword] = payload;

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
        body: JSON.stringify(bodyObj),
        headers: { 'Content-Type': 'application/json ' }
      };
    }

    const f = fetch('/api/edit_profile', options);
    f.then((res) => {
      return res.json();
    }).then((data) => {
      console.log(data, 'edit user');
      return dispatch(editUserSuccess(data));
    }).catch(err => console.log(err));
  };
};

// const saveUserPhone = data => ({
//   type: 'ADD_USER',
//   userObj: data
// });

// export const savePhoneNumber = (payload) => {
//   return (dispatch) => {
//     const data = { user: payload };
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: { 'Content-Type': 'application/json ' }
//     };
//     const f = fetch('/api/users', options);
//     f.then((res) => {
//       return res.json();
//     }).then((DataObj) => {
//       return dispatch(saveUserPhone(data));
//     }).catch(err => console.log(err));
//   };
// };
