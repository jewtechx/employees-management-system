const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const { useSelector } = require('react-redux')


const initialState = {
  employees: [],
  filter: '',
  backendFilterCondition:'',
  loading:false,
  ready: false,
  error: false,
}
let token
if (typeof window !== 'undefined') {
  const userDataString = window.localStorage.getItem("user");
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    token = userData.token
  }
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

export const filterEmployee = createAsyncThunk('filterEmployee', async (condition, thunkAPI) => {
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

export const getSpecEmployee = createAsyncThunk('getSpecEmployee', async (id, thunkAPI) => {
    try{
          const res = await fetch(`http://localhost:5000/employees/${id}`,{
          headers: {
              Authorization: `Bearer ${token}`
            }
          })
        
         
      if (!res.ok) throw new Error('Employee not found')
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


export const deleteEmployee = createAsyncThunk('delete',async(id,thunkAPI) => {

  const empid = id;

    try {
      fetch(`http://localhost:5000/employees/${empid}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      window.location.reload();

  } catch (err) {
      return thunkAPI.rejectWithValue({err:err.message})
    }
  
})


export const updateEmployeeDetails = createAsyncThunk('update',async(data,thunkAPI) => {
  try {
      const response = await fetch('http://localhost:5000/employees', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update employee details.');
      }
    } catch (error) {
      // Handle errors if any occurred during the API call
       return thunkAPI.rejectWithValue({error:error.message})
    }
})


  //SLICE 
const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
      setFilterValue: (state,action) => {
          state.filter = action.payload
      },
      setBackendFilterValue: (state,action) => {
          state.backendFilterCondition = action.payload
      },
      reset: (state) => {
        state.loading = false,
        state.ready = false,
        state.error = false
      }
    },
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
    // state.ready = true;
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
  .addCase(updateEmployeeDetails.pending, (state) => {
    state.loading = true;
  })
  .addCase(updateEmployeeDetails.fulfilled, (state, action) => {
    state.loading = false;
    state.ready = true;
    state.error = false; // Reset error status on success
  })
  .addCase(updateEmployeeDetails.rejected,(state) => {
    state.loading = false
    state.error = true
  })
  // .addCase(getBackendFilterValueFromLocalStorage.fulfilled, (state,action) => {
  //   state.backendFilterCondition = action.payload
  // })
    }
})

export const { setFilterValue,reset,setBackendFilterValue } = employeeSlice.actions
export default employeeSlice.reducer
