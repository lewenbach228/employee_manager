import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { Component } from "react";
import { Input } from "react-native-elements";

import { connect } from "react-redux";

import {
  nameChanged,
  jobChanged,
  emailChanged,
  passwordChanged,
  registerUser,
} from "../../redux/actions/index";

import "../../components/Loading";
import MyButton from "../../components/Button";

export class Register extends Component {
  onNameChange(text) {
    this.props.nameChanged(text);
  }

  onJobChange(text) {
    this.props.jobChanged(text);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { nomEntreprise, services, email, password } = this.props;
    this.props.registerUser({ nomEntreprise, services, email, password });
    
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
    return <MyButton title="S'inscrire" tap={this.onButtonPress.bind(this)} />;
  }

  render() {
    const { navigation } = this.props;
    return (
      <>
        <View style={{ marginTop: 150, marginHorizontal: 25 }}>
          {this.renderError()}
          <Input
            placeholder="Nom de l'entreprise"
            onChangeText={this.onNameChange.bind(this)}
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={{ type: "font-awesome", name: "user" }}
            // EMAIL RETURN BY REDUCER
            value={this.props.nomEntreprise}
          />

          <Input
            placeholder="Service(s) fournies"
            onChangeText={this.onJobChange.bind(this)}
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={{ type: "font-awesome", name: "briefcase" }}
            value={this.props.services}
          />

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
            <Text>Vous avez deja un compte ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ color: "orange", fontWeight: "bold" }}>
                se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { nomEntreprise, services, email, password, error, loading } = auth;
  return {
    nomEntreprise,
    services,
    email,
    password,
    error,
    loading,
  };
};

export default connect(mapStateToProps, {
  nameChanged,
  jobChanged,
  emailChanged,
  passwordChanged,
  registerUser,
})(Register);
