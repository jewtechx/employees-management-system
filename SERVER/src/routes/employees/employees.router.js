const express = require('express')
const { getAllEmployees,getSpecEmployee,getFilteredEmployee,addEmployer,updateEmployeeDetails,deleteEmployee } = require("./employees.controller")

const {protect} = require('../.././middleware/protect')

const employees = express.Router()

employees.get('/',protect,getAllEmployees)
employees.get('/:id',protect,getSpecEmployee)
employees.post(`/filter`,protect,getFilteredEmployee)
employees.post('/',protect,addEmployer)
employees.put('/',protect,updateEmployeeDetails)
employees.delete('/:id',protect,deleteEmployee)

module.exports = {
    employees,
}