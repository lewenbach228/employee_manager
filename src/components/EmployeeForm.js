import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";

import { Picker } from "@react-native-picker/picker";
import { Input } from "react-native-elements";

import { connect } from "react-redux";

import { employeeUpdate } from "../redux/actions/EmployeeAction";

export class EmployeeForm extends Component {
  render() {
    return (
      <View style={{ marginTop: 150, marginHorizontal: 25 }}>
        {/* {this.renderError()} */}
        <Input
          placeholder="Nom de l'employé"
          onChangeText={(text) =>
            this.props.employeeUpdate({ prop: "employeeName", value: text })
          }
          autoCapitalize="none"
          autoCorrect={false}
          leftIcon={{ type: "font-awesome", name: "user", color : 'rgba(231,76,60,1)' }}
          // EMAIL RETURN BY REDUCER
          value={this.props.employeeName}
        />

        <Input
          placeholder="Poste Occupé"
          onChangeText={(text) =>
            this.props.employeeUpdate({ prop: "employeeJob", value: text })
          }
          autoCapitalize="none"
          autoCorrect={false}
          leftIcon={{ type: "font-awesome", name: "briefcase",color : 'rgba(231,76,60,1)' }}
          value={this.props.employeeJob}
        />

        <Input
          autoCapitalize="none"
          onChangeText={(text) =>
            this.props.employeeUpdate({ prop: "employeePhone", value: text })
          }
          autoCorrect={false}
          placeholder="Numéro de l'employée"
          leftIcon={{ type: "font-awesome", name: "envelope-square" ,color : 'rgba(231,76,60,1)'}}
          value={this.props.employeePhone}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.pickerStyle}>Jours de travail</Text>
          <Picker
            style={{ flex: 1 }}
            //   ref={pickerRef}
            selectedValue={this.props.employeeShift}
            onValueChange={(workingDay) =>
              this.props.employeeUpdate({
                prop: "employeeShift",
                value: workingDay,
              })
            }
          >
            <Picker.Item label="Lundi" value="Lundi" />
            <Picker.Item label="Mardi" value="Mardi" />
            <Picker.Item label="Mercredi" value="Mercredi" />
            <Picker.Item label="Jeudi" value="Jeudi" />
            <Picker.Item label="Vendredi" value="Vendredi" />
            <Picker.Item label="Samedi" value="Samedi" />
            <Picker.Item label="Dimanche" value="Dimanche" />
          </Picker>
        </View>
        {/* {this.renderButton()} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pickerStyle: {
    fontSize: 18,
    paddingLeft: 20,
  },
});

const mapStateToProps = (state) => {
  const { employeeName, employeeJob, employeePhone, employeeShift } =
    state.employeeForm;

  return { employeeName, employeeJob, employeePhone, employeeShift };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);
