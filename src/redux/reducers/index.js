import {combineReducers} from 'redux';
import AuthReducer from './AuthReducers';
import EmployeeFormReducer from './EmployeeFormReducer'
import EmployeeReducer from './EmployeeReducer';

export default combineReducers({
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  employees: EmployeeReducer,
});
