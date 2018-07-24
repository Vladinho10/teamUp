import React from 'react';

export const SearchIcon = () => {
  return (
    <svg className="search-form__icon" xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 32 32">
      <title>Search</title>
      <path xmlns="http://www.w3.org/2000/svg" d="M7.012 3c2.193 0 3.977 1.794 3.977 4 0 0.831-0.255 1.63-0.737 2.312l-0.392 0.553-0.55 0.393c-0.678 0.485-1.473 0.742-2.298 0.742-2.193 0-3.977-1.794-3.977-4s1.784-4 3.977-4zM7.012 1c-3.295 0-5.966 2.686-5.966 6s2.671 6 5.966 6c1.288 0 2.477-0.414 3.451-1.112l4.791 4.819c0.195 0.196 0.45 0.293 0.705 0.293s0.51-0.098 0.704-0.293c0.389-0.391 0.389-1.025 0-1.416l-4.791-4.819c0.694-0.98 1.105-2.177 1.105-3.471 0-3.314-2.671-6-5.965-6v0z"/>
    </svg>
  );
};

export const PhotoIcon = () => {
  return (
    <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 32 32">
      <title>camera</title>
      <path xmlns="http://www.w3.org/2000/svg" d="M21 5h-3.5l-1.7-2.6c-0.2-0.2-0.5-0.4-0.8-0.4h-6c-0.3 0-0.6 0.2-0.8 0.4l-1.7 2.6h-3.5c-1.7 0-3 1.3-3 3v11c0 1.7 1.3 3 3 3h18c1.7 0 3-1.3 3-3v-11c0-1.7-1.3-3-3-3zM22 19c0 0.6-0.4 1-1 1h-18c-0.6 0-1-0.4-1-1v-11c0-0.6 0.4-1 1-1h4c0.3 0 0.6-0.2 0.8-0.4l1.7-2.6h4.9l1.7 2.6c0.3 0.2 0.6 0.4 0.9 0.4h4c0.6 0 1 0.4 1 1v11z"/>
      <path xmlns="http://www.w3.org/2000/svg" d="M12 8c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zM12 16c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
    </svg>
  );
};

export const EventLocationIcon = () => {
  return (
    <svg className="icon__location" xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32">
      <title>location</title>
      <path d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/>
    </svg>
  );
};


export const PlusIcon = (props) => {
  return (
    <svg className="plus-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24">
      <title>{props.title}</title>
      <path d="M19 2h-14c-1.7 0-3 1.3-3 3v14c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-14c0-1.7-1.3-3-3-3zM20 19c0 0.6-0.4 1-1 1h-14c-0.6 0-1-0.4-1-1v-14c0-0.6 0.4-1 1-1h14c0.6 0 1 0.4 1 1v14z"/>
      <path d="M16 11h-3v-3c0-0.6-0.4-1-1-1s-1 0.4-1 1v3h-3c-0.6 0-1 0.4-1 1s0.4 1 1 1h3v3c0 0.6 0.4 1 1 1s1-0.4 1-1v-3h3c0.6 0 1-0.4 1-1s-0.4-1-1-1z"/>
    </svg>
  );
};

export const EventClockIcon = () => {
  return (
    <svg className="icon__clock" xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="32" viewBox="0 0 32 32">
      <title>alarm</title>
      <path d="M16 4c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14-6.268-14-14-14zM16 29.25c-6.213 0-11.25-5.037-11.25-11.25s5.037-11.25 11.25-11.25c6.213 0 11.25 5.037 11.25 11.25s-5.037 11.25-11.25 11.25zM29.212 8.974c0.501-0.877 0.788-1.892 0.788-2.974 0-3.314-2.686-6-6-6-1.932 0-3.65 0.913-4.747 2.331 4.121 0.851 7.663 3.287 9.96 6.643v0zM12.748 2.331c-1.097-1.418-2.816-2.331-4.748-2.331-3.314 0-6 2.686-6 6 0 1.082 0.287 2.098 0.788 2.974 2.297-3.356 5.838-5.792 9.96-6.643z"/>
      <path d="M16 18v-8h-2v10h8v-2z"/>
    </svg>
  );
};

export const LocationIcon = () => {
  return (
    <svg className="search-form__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
      <title>Pin</title>
      <path d="M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"/>
    </svg>
  );
};

export const EditIcon = () => {
  return (
    <svg className="edit-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" width="20" height="20" viewBox="0 0 20 20">
      <title>edit</title>
      <path d="M17.561 2.439c-1.442-1.443-2.525-1.227-2.525-1.227l-12.826 12.825-1.010 4.762 4.763-1.010 12.826-12.823c-0.001 0 0.216-1.083-1.228-2.527zM5.68 17.217l-1.624 0.35c-0.156-0.293-0.345-0.586-0.69-0.932s-0.639-0.533-0.932-0.691l0.35-1.623 0.47-0.469c0 0 0.883 0.018 1.881 1.016 0.997 0.996 1.016 1.881 1.016 1.881l-0.471 0.468z"/>
    </svg>
  );
};

export const DeleteIcon = () => {
  return (
    <svg className="delete-icon" xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24">
      <title>delete</title>
      <path d="M13.4 12l5.3-5.3c0.4-0.4 0.4-1 0-1.4s-1-0.4-1.4 0l-5.3 5.3-5.3-5.3c-0.4-0.4-1-0.4-1.4 0s-0.4 1 0 1.4l5.3 5.3-5.3 5.3c-0.4 0.4-0.4 1 0 1.4 0.2 0.2 0.4 0.3 0.7 0.3s0.5-0.1 0.7-0.3l5.3-5.3 5.3 5.3c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.4 0.4-1 0-1.4l-5.3-5.3z"/>
    </svg>
  );
};
