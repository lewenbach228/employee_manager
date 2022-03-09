import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE_SUCCESS,
} from "../constants/index";

const INITIAL_STATE = {
  employeeName: "",
  employeeJob: "",
  employeePhone: "",
  employeeShift: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case EMPLOYEE_CREATE:
      return INITIAL_STATE;
    case EMPLOYEE_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
