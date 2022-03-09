// import {LogBox} from 'react-native';

import React, { Component } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/redux/reducers/index";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD9GyUaGraV-qeq-KXTk5gUI6B_5ec0TSQ",
  authDomain: "employee-manager-d2fc5.firebaseapp.com",
  projectId: "employee-manager-d2fc5",
  storageBucket: "employee-manager-d2fc5.appspot.com",
  messagingSenderId: "369396970200",
  appId: "1:369396970200:web:9225fbc910cbacb39c5dad",
  measurementId: "G-JS0YZ788HS",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
//  LISTES DES ECRANS ET COMPONENTS IMPORTEES
import Register from "./src/screens/Auth/Register";
import Login from "./src/screens/Auth/Login";
import Loading from "./src/components/Loading";

// LISTES DES PAGES DE MAIN
// import EmployeeList from "./src/screens/Main/EmployeeList";
import EmployeeCreate from "./src/screens/Main/EmployeeCreate";
import EmployeeEdit from "./src/screens/Main/EmployeeEdit";
import BottomTabNavigator from "./src/screens/BottomTab";

const Stack = createNativeStackNavigator();

class App extends Component {
  _isMount = false;
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }
  //  ON FIRST LOAD OF APP
  componentDidMount() {
    // LogBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);
    this._isMount = true;
    firebase.auth().onAuthStateChanged((user) => {
      //  USER IS SIGN OUT
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        //  USER IS SIGN IN
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMount = false;
  }

  render() {
    const { loggedIn, loaded } = this.state;
    // IF SCREEN IS LOADING
    if (!loaded) {
      return <Loading />;
    }
    //  SI USER NOT AUTHENTIFICATE HIMSELF
    if (!loggedIn) {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Register"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Register" component={Register}></Stack.Screen>
              <Stack.Screen name="Login" component={Login}></Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      );
    }
    //  SI USER SUCCESSFULLY AUTH HIMSELF
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="BottomTab"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            ></Stack.Screen>

            <Stack.Screen
              name="EmployeeCreate"
              component={EmployeeCreate}
              // navigation={this.props.navigation}
              options={{ headerShown: false }}
            ></Stack.Screen>

            <Stack.Screen
              name="Edit"
              component={EmployeeEdit}
              // navigation={this.props.navigation}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
