// import moment from 'moment';

// // Filters Reducer

// const filtersReducerDefaultState = {
//   name: '',
//   date: moment().endOf('day'),
//   location: '',
//   type: '',
//   startDate: moment().startOf('day'),
//   endDate: moment().endOf('day')
// };

// export default (state = filtersReducerDefaultState, action) => {
//   switch (action.type) {
//     case 'EVENTS_BY_NAME':
//       return {
//         ...state,
//         name: action.name
//       };
//     case 'EVENTS_BY_DATE':
//       return {
//         ...state,
//         date: action.date
//       };
//     case 'EVENTS_BY_LOCATION':
//       return {
//         ...state,
//         sortBy: 'date'
//       };
//     case 'EVENTS_BY_TYPE':
//       return {
//         ...state,
//         startDate: action.startDate
//       };
//     default:
//       return state;
//   }
// };
