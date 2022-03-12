import _ from "lodash"; // HELP CONVERT OBJECT TO ARRAY

import { Text, View } from "react-native";
import React, { Component } from "react";
import { Avatar } from "react-native-elements";
import firebase from "firebase";
// import { connect } from "react-redux";

import MyButton from "../../components/Button";

export class Profile extends Component {
  render() {
    // const { nomEntreprise, services } = this.props.currentUser;
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          marginBottom: 100,
        }}
      >
        <Avatar
          size={120}
          rounded
          icon={{
            name: "apartment",
            type: "material",
            color: "#009688",
          }}
          containerStyle={{
            borderColor: "grey",
            borderStyle: "solid",
            borderWidth: 1,
          }}
        />
        {/* <Text>{nomEntreprise}</Text> */}
        {/* <Text>{services}</Text> */}
        <MyButton
          title="Deconnexion"
          tap={() => {
            firebase
              .auth()
              .signOut()
              .then(() => {
                // Sign-out successful.
              })
              .catch((error) => {
                // An error happened.
                console.log(error);
              });
          }}
        />
      </View>
    );
  }
}

// const mapStateToProps = (state) => ({
//   currentUser: state.auth.user,
// });
export default Profile;
