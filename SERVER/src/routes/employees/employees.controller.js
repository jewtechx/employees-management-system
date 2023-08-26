const { pool } = require('../../models/model.employees');
const uuid = require('uuid')
// get
function getAllEmployees(req, res) {
  const admin_id = req.user.id
  pool.query('SELECT * FROM employee WHERE admin_id = $1 ORDER BY start_date',[admin_id])
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
    const admin_id = req.user.id
    pool.query('SELECT * FROM employee WHERE admin_id = $1 AND id = $2',[admin_id,id])
    .then(result => {
      const { rows } = result
      return res.status(200).json(rows)
    })
    .catch(error => {
      return res.status(200).json(error)
    })
  }
  
  //getFilteredEmployee
  async function getFilteredEmployee(req,res){
    try{
    const admin_id = req.user.id
    const {condition} = req.body
    const query = `Select * from employee where admin_id = $1 ${condition}`
    await pool.query(query,[admin_id])
    .then(results => {
      const { rows } = results
      return res.status(200).json(rows)
    })
  }catch(err){
    res.status(500).json({error:`Internal Server Error, ${err}`})
  }
}

// post
function addEmployer(req, res) {
  const id = uuid.v4();
  const adminId = req.user.id
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
      INSERT INTO employee (
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
        status,
        admin_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14,$15,$16);
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
      status,
      adminId
    ];
  
    pool
      .query(query, values)
      .then(() => {
       res.status(201).json({ message: 'Employee added successfully' });
      })
      .catch((error) => {
        console.log('Error executing query', error);
        res.status(400).json({ error: `Error with database query: ${error}` });
      });

     
  }
  
  //update
  function updateEmployeeDetails(req, res) {
    const adminId = req.user.id
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
      !status){
       return res.status(400).json({
          error:'Probably missing required fields while updating'
        })
      }

    const query = `
      UPDATE employee 
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
      WHERE id = $1 and admin_id = $16
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
      status,
      adminId
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
  const adminId = req.user.id
    const employeeId = req.params.id;

    if(!employeeId){
      res.status('400').json({
        error:"employee not found"
      })
    }
  
    const query = `
      DELETE FROM employee
      WHERE id = $1 and admin_id = $2
    `;
  
    pool
      .query(query, [employeeId,adminId])
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
    getFilteredEmployee,
    addEmployer,
    updateEmployeeDetails,
    deleteEmployee
};
