import { Text, View, Button } from "react-native";
import React, { Component } from "react";
import { Avatar, Card, Icon } from "react-native-elements";
import Communications from "react-native-communications";
import ConfirmModal from "./ModalConfirm";
import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";

import { employeeDelete } from "../redux/actions/EmployeeAction";

export class EmployeeListItem extends Component {
  state = { showModal: false };

  onSmsButtonPress() {
    const { employeePhone, employeeShift } = this.props;
    Communications.text(employeePhone, `Vous avez travail le ${employeeShift}`);
  }

  onCallButtonPress() {
    const { employeePhone } = this.props;

    Communications.phonecall(`employeePhone`, true);
  }

  onAccept() {
    const { uid } = this.props.employee;
    this.props.employeeDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    const { navigation } = this.props;
    const { employeeName, employeeJob, employeePhone, employeeShift } =
      this.props.employee;
    return (
      <Card>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginBottom: 12,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <Avatar
                size={64}
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
              <View
                style={{
                  // flex : 1,
                  flexDirection: "column",
                  // alignContent: "space-around",
                  marginLeft: 10,
                  marginTop: 10,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "500" }}>
                  {employeeName}
                </Text>
                <Text style={{ color: "rgba(231,76,60,1)", fontWeight: "300" }}>
                  {employeeJob}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                padding: "auto",
                marginTop: 10,
                marginLeft: 10,
              }}
            >
              <View style={{ marginRight: 10 }}>
                <Icon
                  name="edit"
                  type="font-awesome"
                  color="black"
                  onPress={() => navigation.navigate("Edit", {
                    employee: this.props.employee,
                  })}
                />
              </View>
              <Icon
                name="heartbeat"
                type="font-awesome"
                color="#f50"
                onPress={() =>
                  this.setState({ showModal: !this.state.showModal })
                }
              />
              <ConfirmModal
                visible={this.state.showModal}
                onAccept={this.onAccept.bind(this)}
                onDecline={this.onDecline.bind(this)}
              ></ConfirmModal>
            </View>
          </View>

          <View
            style={{
              // flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}> Numéro : {employeePhone}</Text>
            <Text style={{ fontSize: 18 }}>
              {" "}
              Jour de travail : {employeeShift}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            margin: 10,
            // justifyContent: "space-around",
            // borderWidth: 1,
          }}
        >
          <View style={{ flex: 1 / 2, marginRight: 10 }}>
            <Button onPress={this.onSmsButtonPress.bind(this)} title="Sms" />
          </View>
          <View style={{ flex: 1 / 2, marginRight: 10 }}>
            <Button onPress={this.onCallButtonPress.bind(this)} title="Appel" />
          </View>
        </View>
      </Card>
    );
  }
}

// export default connect(null, { employeeDelete })(EmployeeListItem);
export default connect(null, { employeeDelete })(function (props) {
  const navigation = useNavigation();

  return <EmployeeListItem {...props} navigation={navigation} />;
});
