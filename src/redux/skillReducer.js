const initialState = {
  skills: [],
};

const SET_SKILLS = "SET_SKILLS";

export function setSkills(skills) {
  return {
    type: SET_SKILLS,
    payload: skills,
  };
}

export default function skillReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SKILLS:
      return { ...state, skills: action.payload };
    default:
      return { ...state };
  }
}
