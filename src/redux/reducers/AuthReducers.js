import {
  NAME_CHANGED,
  JOB_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER_SUCCESS,
  USER_STATE_CHANGE,
} from "../constants/index";

const INITIAL_STATE = {
  nomEntreprise: "",
  services: "",
  email: "",
  password: "",
  user: null,
  error: "",
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state, nomEntreprise: action.payload };
    case JOB_CHANGED:
      return { ...state, services: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: "",
        loading: false,
        email: "",
        password: "",
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: "",
        loading: false,
        email: "",
        password: "",
      };
    case USER_STATE_CHANGE:
      return {
        ...state,
        user: action.currentUser,
      };
    case LOGIN_USER:
      return { ...state, loading: true, error: "" };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: "Données invalide...",
        password: "",
        loading: false,
        error: "",
        email: "",
      };
    default:
      return state;
  }
};
