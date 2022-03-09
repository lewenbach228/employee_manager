import React, { Component } from "react";
import EmployeeForm from "../../components/EmployeeForm";

import { connect } from "react-redux";
import {
  employeeUpdate,
  employeeCreate,
} from "../../redux/actions/EmployeeAction";

import "../../components/Loading";
import MyButton from "../../components/Button";

export class EmployeeCreate extends Component {
  onButtonPress() {
    const { employeeName, employeeJob, employeePhone, employeeShift } =
      this.props;
    this.props.employeeCreate({
      employeeName,
      employeeJob,
      employeePhone,
      employeeShift: employeeShift || "Lundi",
    });
    this.props.navigation.goBack();
  }

  render() {
    return (
      <>
        <EmployeeForm {...this.props} />
        <MyButton title="Recruter" tap={this.onButtonPress.bind(this)} />
      </>
    );
  }
}

const mapStateToProps = ({ employeeForm }) => {
  const { employeeName, employeeJob, employeePhone, employeeShift } =
    employeeForm;
  return {
    employeeName,
    employeeJob,
    employeePhone,
    employeeShift,
  };
};

export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(
  EmployeeCreate
);
