const express = require('express')
const { getAllEmployees,getSpecEmployee,getFilteredEmployee,addEmployer,updateEmployeeDetails,deleteEmployee } = require("./employees.controller")

const employees = express.Router()

employees.get('/',getAllEmployees)
employees.get('/:id',getSpecEmployee)
employees.post(`/filter`,getFilteredEmployee)
employees.post('/',addEmployer)
employees.put('/',updateEmployeeDetails)
employees.delete('/:id',deleteEmployee)

module.exports = {
    employees,
}