import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth.reducer';
import employeesReducer from './employees/employees.reducer';

const store = configureStore({
  reducer: {
    auth: authReducer, // Use the imported authReducer here
    employees: employeesReducer,
  },
});

export default store;
