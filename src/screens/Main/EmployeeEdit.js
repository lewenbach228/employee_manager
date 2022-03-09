import _ from "lodash";
import React, { Component } from "react";

import EmployeeForm from "../../components/EmployeeForm";
import { connect } from "react-redux";
import MyButton from "../../components/Button";
import {
  employeeUpdate,
  employeeSave,
} from "../../redux/actions/EmployeeAction";

export class EmployeeEdit extends Component {
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { employeeName, employeeJob, employeePhone, employeeShift } =
      this.props;
    this.props.employeeSave({
      employeeName,
      employeeJob,
      employeePhone,
      employeeShift,
      uid: this.props.employee.uid,
    });
    this.props.navigation.goBack();
  }

  render() {
    return (
      <>
        <EmployeeForm />
        <MyButton title="Editer" tap={this.onButtonPress.bind(this)} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { employeeName, employeeJob, employeePhone, employeeShift } =
    state.employeeForm;

  return { employeeName, employeeJob, employeePhone, employeeShift };
};
export default connect(mapStateToProps, { employeeUpdate, employeeSave })(
  EmployeeEdit
);
