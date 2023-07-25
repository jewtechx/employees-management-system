const express = require('express')
const { getAllEmployees,getSpecEmployee,addEmployer,updateEmployeeDetails,deleteEmployee } = require("./employees.controller")

const employees = express.Router()

employees.get('/',getAllEmployees)
employees.get('/:id',getSpecEmployee)
employees.post('/',addEmployer)
employees.put('/',updateEmployeeDetails)
employees.delete('/:id',deleteEmployee)

module.exports = {
    employees,
}