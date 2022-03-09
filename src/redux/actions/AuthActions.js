import firebase from "firebase";

import {
  NAME_CHANGED,
  JOB_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  
  LOGIN_USER_SUCCESS,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  USER_STATE_CHANGE
} from "../constants";

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text,
  };
};

export const jobChanged = (text) => {
  return {
    type: JOB_CHANGED,
    payload: text,
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text,
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text,
  };
};

export const registerUser = ({ nomEntreprise, services, email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            nomEntreprise,
            services,
            email,
          });
        dispatch({ type: REGISTER_USER_SUCCESS, payload: user });
      })
      .catch((error) => {
        authUserFail(dispatch);
        console.log(error);
      });
  };
};

const authUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
      })
      .catch((error) => {
        authUserFail(dispatch);
        console.log(error);
      });
  };
};

export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log(snapshot.data());
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("does not exists");
        }
      });
  };
}