import firebase from "firebase";

import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS,
} from "../constants";

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value },
  };
};

export const employeeCreate = ({
  employeeName,
  employeeJob,
  employeePhone,
  employeeShift,
}) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees`)
      .push({ employeeName, employeeJob, employeePhone, employeeShift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
        // this.props.navigation.goBack();
      });
  };
};

export const employeeFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees`)
      .on("value", (snapshot) => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const employeeSave = ({
  employeeName,
  employeeJob,
  employeePhone,
  employeeShift,
  uid,
}) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ employeeName, employeeJob, employeePhone, employeeShift })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
      });
  };
};

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove();
  };
};
