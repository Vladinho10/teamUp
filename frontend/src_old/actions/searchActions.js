const getSearchSuccess = result => ({
  type: 'GET_ALL_RESULTS',
  result
});

const getSearch = (keyword) => {
  const encodedKeyword = encodeURIComponent(keyword);
  return (dispatch) => {
    const options = {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ encodedKeyword }),
      headers: { 'Content-Type': 'application/json ' }
    };
    const f = fetch(`/api/search_results/${encodedKeyword}`, options);
    f.then((res) => {
      return res.json();
    }).then((result) => {
      // console.log(result, 'result from search');
      return dispatch(getSearchSuccess(result));
    }).catch(err => console.log(err));
  };
};

export default getSearch;
