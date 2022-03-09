import _ from "lodash"; // HELP CONVERT OBJECT TO ARRAY

import { FlatList, View } from "react-native";
import React, { Component } from "react";

import { connect } from "react-redux";
import { employeeFetch } from "../../redux/actions/EmployeeAction";

import EmployeeListItem from "../../components/EmployeeListItem";

export class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeeFetch();
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View>
          <FlatList
            data={this.props.employees}
            renderItem={({ item }) => (
              <EmployeeListItem employee={item} navigation={navigation} />
            )}
            keyExtractor={(employee) => employee.uid}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });
  return { employees };
};

export default connect(mapStateToProps, { employeeFetch })(EmployeeList);
