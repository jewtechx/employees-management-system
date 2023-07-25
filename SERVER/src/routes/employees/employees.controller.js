const { pool } = require('../../models/model.employees');

// get
function getAllEmployees(req, res) {
  pool.query('SELECT * FROM employees')
    .then((result) => {
      const rows = result.rows;
      return res.status(200).json(rows);
    })
    .catch((error) => {
      console.log('Error executing query', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    });
}
//get spec employee
function getSpecEmployee(req,res){
  const id = req.params.id
  pool.query('SELECT * FROM employees WHERE id = $1',[id])
  .then(result => {
    const { rows } = result
    return res.status(200).json(rows)
  })
  .catch(error => {
    return res.status(200).json(error)
  })
}

// post
function addEmployer(req, res) {
    const {
      first_name,
      last_name,
      date_of_birth,
      gender,
      email,
      phone_number,
      address,
      department,
      position,
      salary,
      start_date,
      end_date,
      supervisor,
      status
    } = req.body;
  
    if(
      !first_name ||
      !last_name ||
      !date_of_birth ||
      !gender ||
      !email ||
      !phone_number ||
      !address ||
      !department ||
      !position ||
      !salary ||
      !start_date ||
      !supervisor ||
      !status){
       return res.status(400).json({
          error:'Probably missing required fields while posting'
        })
      }


      const startDate = new Date(start_date)
      const DOB = new Date(date_of_birth)
  
      if(isNaN(startDate) || isNaN(DOB)){
        return res.status(400).json({
          error:'invalid date format'
        })
      }

    const query = `
      INSERT INTO employees (
        first_name,
        last_name,
        date_of_birth,
        gender,
        email,
        phone_number,
        address,
        department,
        position,
        salary,
        start_date,
        end_date,
        supervisor,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14);
    `;
  
    const values = [
      first_name,
      last_name,
      date_of_birth,
      gender,
      email,
      phone_number,
      address,
      department,
      position,
      salary,
      start_date,
      end_date,
      supervisor,
      status
    ];
  
    pool
      .query(query, values)
      .then(() => {
       res.status(201).json({ message: 'Employee added successfully' });
      })
      .catch((error) => {
        console.log('Error executing query', error);
        res.status(400).json({ error: 'Error with database query' });
      });

     
  }
  
  function updateEmployeeDetails(req, res) {
    const {
      id,
      first_name,
      last_name,
      date_of_birth,
      gender,
      email,
      phone_number,
      address,
      department,
      position,
      salary,
      start_date,
      end_date,
      supervisor,
      status
    } = req.body;
  

    
    if(
      !id ||
      !first_name ||
      !last_name ||
      !date_of_birth ||
      !gender ||
      !email ||
      !phone_number ||
      !address ||
      !department ||
      !position ||
      !salary ||
      !start_date ||
      !supervisor ||
      !status){
       return res.status(400).json({
          error:'Probably missing required fields while updating'
        })
      }

    const query = `
      UPDATE employees 
      SET 
        first_name = $2,
        last_name = $3,
        date_of_birth = $4,
        gender = $5,
        email = $6,
        phone_number = $7,
        address = $8,
        department = $9,
        position = $10,
        salary = $11,
        start_date = $12,
        end_date = $13,
        supervisor = $14,
        status = $15
      WHERE id = $1
    `;
  
    const values = [
      id,
      first_name,
      last_name,
      date_of_birth,
      gender,
      email,
      phone_number,
      address,
      department,
      position,
      salary,
      start_date,
      end_date,
      supervisor,
      status
    ];
  
    pool
      .query(query, values)
      .then(() => {
        return res.status(200).json({ message: 'Employee details updated successfully' });
      })
      .catch((error) => {
        console.log('Error executing query', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      });

    
  }


//   delete
function deleteEmployee(req, res) {
    const employeeId = Number(req.params.id);
  
    const query = `
      DELETE FROM employees
      WHERE id = $1
    `;
  
    pool
      .query(query, [employeeId])
      .then(() => {
        return res.status(200).json({ message: 'Employee deleted successfully' });
      })
      .catch((error) => {
        return res.status(500).json({ error: 'Internal Server Error' });
      });
  }
 
module.exports = {
    getAllEmployees,
    getSpecEmployee,
    addEmployer,
    updateEmployeeDetails,
    deleteEmployee
};
