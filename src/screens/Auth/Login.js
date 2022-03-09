import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { Component } from "react";
import { Input } from "react-native-elements";

import { connect } from "react-redux";

import {
  emailChanged,
  passwordChanged,
  loginUser,
} from "../../redux/actions/index";

import "../../components/Loading";
import MyButton from "../../components/Button";

export class Login extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: "orange", alignSelf: "center", fontSize: 18 }}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <ActivityIndicator size="large" color="orange" />
        </View>
      );
    }
    return (
      <MyButton title="Se connecter" tap={this.onButtonPress.bind(this)} />
    );
  }

  render() {
    const { navigation } = this.props;

    return (
      <>
        <View style={{ marginTop: 150, marginHorizontal: 25 }}>
          {this.renderError()}

          <Input
            autoCapitalize="none"
            onChangeText={this.onEmailChange.bind(this)}
            autoCorrect={false}
            placeholder="Email"
            leftIcon={{ type: "font-awesome", name: "envelope-square" }}
            value={this.props.email}
          />

          <Input
            autoCapitalize="none"
            onChangeText={this.onPasswordChange.bind(this)}
            autoCorrect={false}
            secureTextEntry={true}
            placeholder="Mot de passe"
            leftIcon={{ type: "font-awesome", name: "lock" }}
            value={this.props.password}
          />
          {this.renderButton()}
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <Text>Pas encore inscris ? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: "orange", fontWeight: "bold" }}>
                {" "}
                créer un compte
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return {
    email,
    password,
    error,
    loading,
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
})(Login);
