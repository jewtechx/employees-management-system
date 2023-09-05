const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const { useSelector } = require('react-redux')


const initialState = {
  employees: [],
  loading:false,
  ready: false,
  error: false,
}
let token
const userDataString = localStorage.getItem("user");
  if (userDataString) {
  const userData = JSON.parse(userDataString);
  token = userData.token
  }


export const getEmployees = createAsyncThunk('getEmployees', async (thunkAPI) => {
  try {
        
    const res = await fetch('http://localhost:5000/employees', {
            method:'get',
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
        
          if (!res.ok) throw new Error('Fetch request failed probably due to network connectivity')
        
          return await res.json()
    } catch (error) {
        return thunkAPI.rejectWithValue({error:error.message})
  }
})

export const filterEmployee = createAsyncThunk('filterEmployee', async (data, thunkAPI) => {
  try {
      
      const res = await fetch(`http://localhost:5000/employees/filter`,{
        method:'POST',
            headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({condition:condition})
        })
        if (!res.ok) throw new Error('Filtering gone wrong in backend')
        return await res.json(); 
    } catch (error) {
        return thunkAPI.rejectWithValue({error:error.message})
    }
})

export const getSpecEmployee = createAsyncThunk('getSpecEmployee', async (data, thunkAPI) => {
    try{
          const res = await fetch(`http://localhost:5000/employees/${id}`,{
          headers:{
              Authorization: `Bearer ${token}`
            }
          })
        
         
          if(!res.ok) throw new Error('Employee not found')
          return await res.json()
      } catch (error) {
        return thunkAPI.rejectWithValue({error:error.message})
    }
})

export const AddEmployee = createAsyncThunk('addEmployee', async(data,thunkAPI) => {
  try {
  const res = await fetch('http://localhost:5000/employees',{
    method:'post',
    headers:{
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`
    },
    body:JSON.stringify(data)
  })

  if(!res.ok) throw new Error('Could not add employee')
  } catch (error) {
    return thunkAPI.rejectWithValue({error:error.message})
  }
})

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(getEmployees.pending, (state) => {
          state.loading = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
          state.loading = false;
          state.ready = true;
          state.employees = action.payload;
          state.error = false; // Reset error status on success
      })
      .addCase(getEmployees.rejected,(state) => {
          state.loading = false;
          state.error = true;
})
      .addCase(getSpecEmployee.pending, (state) => {
        state.loading = true;
      })
  .addCase(getSpecEmployee.fulfilled, (state, action) => {
    state.loading = false;
    state.ready = true;
    state.employees = action.payload;
    state.error = false; // Reset error status on success
  })
  .addCase(getSpecEmployee.rejected,(state) => {
    state.loading = false;
    state.error = true;
  })
  .addCase(filterEmployee.pending, (state) => {
    state.loading = true;
  })
  .addCase(filterEmployee.fulfilled, (state, action) => {
    state.loading = false;
    state.ready = true;
    state.employees = action.payload;
    state.error = false; // Reset error status on success
  })
  .addCase(filterEmployee.rejected,(state) => {
    state.loading = false
          state.error = true
  })
  .addCase(AddEmployee.pending, (state) => {
    state.loading = true;
  })
  .addCase(AddEmployee.fulfilled, (state, action) => {
    state.loading = false;
    state.ready = true;
    state.error = false; // Reset error status on success
  })
  .addCase(AddEmployee.rejected,(state) => {
    state.loading = false
          state.error = true
  })
  
    }
})

export const employeeActions = employeeSlice.actions
export default employeeSlice.reducer
