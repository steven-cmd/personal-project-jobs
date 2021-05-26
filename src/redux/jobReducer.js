const initialState = {
  jobs: [],
};

const SET_JOBS = "SET_JOBS";

export function setJobs(jobs) {
  return {
    type: SET_JOBS,
    payload: jobs,
  };
}

export default function jobReducer(state = initialState, action) {
  switch (action.type) {
    case SET_JOBS:
      return { ...state, jobs: action.payload };
    default:
      return { ...state };
  }
}
