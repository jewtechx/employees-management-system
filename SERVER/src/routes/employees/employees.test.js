const request = require('supertest')
const app = require('../../app')


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
  condition:"where first_name = 'Moriss';"
}
const nullFilter = {
  condition:"where"
}
describe('Test POST /employees', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
        .get('/employees')
        .expect('Content-Type', /json/)
        .expect(200)
    })
})

describe('Test POST /employees/filter', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app)
    .post('/employees/filter')
    .send(filter)
    .expect('Content-Type', /json/)
    .expect(200)
  })

  test('It should respond with 500 Internal Server Error', async() => {
    const response = await request (app)
    .post('/employees/filter')
    .send(nullFilter)
    .expect(500)
  })
})

describe('Test POST /launches', () => {

    test('It should respond with 201 created', async() => {
        const response = await request(app)
        .post('/employees')
        .send(employeeData)
      .expect('Content-Type', /json/)
      .expect(201);
     
      expect(employeeData).toMatchObject(employeeDataWithoutDate)

    })

    test('It should catch missing fields in post requests', async () => {
        const response = await request(app)
          .post('/employees')
          .send(employeeDataWithoutDate)
          .expect('Content-Type', /json/)
          .expect(400);
      
        expect(response.body).toStrictEqual({
          error: 'Probably missing required fields while posting' // Corrected the typo 'Probalby' to 'Probably'
        });
      });

      test('It should catch invalid dates', async () => {
        const response = await request(app)
          .post('/employees')
          .send(employeeDataWithInvalidDate)
          .expect('Content-Type', /json/)
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
    .expect('Content-Type', /json/)
  })

  test('It should have all fields', async() => {
    const response = await request(app)
    .put('/employees')
    .send(employeeDataWithoutDate)
    .expect(400)
  })
})

describe("DELETE request /employees", () => {
  test('An id should be provided', async () => {
    const response = await request(app)
    .delete('/employees/:id')
    .send('')
    .expect(500)
  })
})