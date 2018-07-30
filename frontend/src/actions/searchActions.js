const getSearchSuccess = result => ({
  type: 'GET_ALL_RESULTS',
  result
});

const getSearch = (keyword) => {
  return (dispatch) => {
    const options = {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ keyword }),
      headers: { 'Content-Type': 'application/json ' }
    };
    const f = fetch(`/api/search_results/${keyword}`, options);
    f.then((res) => {
      return res.json();
    }).then((result) => {
      console.log(result, 'result from search');
      return dispatch(getSearchSuccess(result));
    }).catch(err => console.log(err));
  };
};

export default getSearch;
