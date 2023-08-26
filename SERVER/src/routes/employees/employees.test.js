const request = require('supertest')
const app = require('../../app')
const {pool} = require("../../models/model.employees")

var employeeData = {
  first_name:"Sandra ",
  last_name:"Larbi Danquah",
  date_of_birth:"06/01/2006",
  gender:"female",
  email:"sandy15@gmail.com",
  phone_number:"0591660801",
  address:"125 Emp street, NYC",
  department:"Management",
  position:"assistant",
  salary:"809990.00",
  start_date:"01/01/2026",
  end_date:null,
  supervisor:"God",
  status:"verified"
}

var employeeDataForPutRequest = {
  id:'c964157d-72e9-4131-966e-e8ee05ee00e4',
  first_name:"Sandra ",
  last_name:"Larbi Danquah",
  date_of_birth:"06/01/2006",
  gender:"female",
  email:"sandy15@gmail.com",
  phone_number:"0591660801",
  address:"125 Emp street, NYC",
  department:"Management",
  position:"assistant",
  salary:"809990.00",
  start_date:"01/01/2026",
  end_date:null,
  supervisor:"God",
  status:"verified"
}

var employeeDataWithoutDate = {
first_name:"Sandra ",
last_name:"Larbi Danquah",
date_of_birth:"06/01/2006",
gender:"female",
email:"sandy15@gmail.com",
phone_number:"0591660801",
address:"125 Emp street, NYC",
department:"Management",
position:"assistant",
salary:"809990.00",
supervisor:"God",
status:"verified"
}

var employeeDataWithInvalidDate = {
  first_name:"Sandra ",
  last_name:"Larbi Danquah",
  date_of_birth:"dfdgrgrgrf",
  gender:"female",
  email:"sandy15@gmail.com",
  phone_number:"0591660801",
  address:"125 Emp street, NYC",
  department:"Management",
  position:"assistant",
  salary:"809990.00",
  start_date:"fgerdfdfd",
  end_date:null,
  supervisor:"God",
  status:"verified"
}

const filter = {
  condition:"order by first_name"
}
const nullFilter = {
  condition:"where"
}
describe('EmployEase', () => {

  let adminToken;

    beforeAll(async () => {
        // Authenticate as admin and get the token
        const response = await request(app)
            .post('/admin/login') // Replace with your authentication route
            .send({ email: 'jwlarbi15@gmail.com', password: 'Floreat123!' });

        adminToken = response.body.token;
    });

    afterAll(() => {
        // Close the database pool after tests are done
        pool.end();
    });


  describe('Test GET /employees', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
        .get('/employees')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
    })
})

describe('Test POST /employees/filter', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app)
    .post('/employees/filter')
    .send(filter)
    .set('Authorization', `Bearer ${adminToken}`)
    .expect(200)
  })
  
  test('It should respond with 500 Internal Server Error', async() => {
    const response = await request (app)
    .post('/employees/filter')
    .send(nullFilter)
    .set('Authorization', `Bearer ${adminToken}`)
    .expect(500)
  })
})

describe('Test POST /employees', () => {

    test('It should respond with 201 created', async() => {
        const response = await request(app)
        .post('/employees')
        .send(employeeData)
        .expect(201)
        .set('Authorization', `Bearer ${adminToken}`)
     
      expect(employeeData).toMatchObject(employeeDataWithoutDate)

    })

    test('It should catch missing fields in post requests', async () => {
        const response = await request(app)
          .post('/employees')
          .send(employeeDataWithoutDate)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(400);
      
        expect(response.body).toStrictEqual({
          error: 'Probably missing required fields while posting' // Corrected the typo 'Probalby' to 'Probably'
        });
      });

      test('It should catch invalid dates', async () => {
        const response = await request(app)
          .post('/employees')
          .send(employeeDataWithInvalidDate)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(400);
      
        expect(response.body).toStrictEqual({
          error: 'invalid date format' // Corrected the expectation to the correct error message
        });
      });
})

//put request

describe('PUT request /employees/', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app)
    .put('/employees')
    .send(employeeDataForPutRequest)
    .expect(200)
    .set('Authorization', `Bearer ${adminToken}`)
    
  })
  test('It should have all fields', async() => {
    const response = await request(app)
    .put('/employees')
    .send(employeeDataWithoutDate)
    .set('Authorization', `Bearer ${adminToken}`)
    .expect(400)
  })
})

describe("DELETE request /employees", () => {
  test('An id should be provided', async () => {
    const response = await request(app)
    .delete('/employees/:id')
    .send('')
    .set('Authorization', `Bearer ${adminToken}`)
    .expect(500)
  })
})

})