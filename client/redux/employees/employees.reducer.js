const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');
const { useSelector } = require('react-redux')


const initialState = {
  employees: [],
  loading:false,
  ready: false,
  error: false,
}

export const getEmployees = createAsyncThunk('getEmployees', async (data, thunkAPI) => {
  try {
      const token = useSelector((state) => state.auth.token);
      const res = await fetch('http://localhost:4000/employees',{
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
    try{
      const token = useSelector((state) => state.auth.token);
      const res = await fetch(`http://localhost:4000/employees/filter`,{
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

export const getSpecEmployee = createAsyncThunk('filterEmployee', async (data, thunkAPI) => {
    try{
        const token = useSelector((state) => state.auth.token);
        const res = await fetch(`http://localhost:4000/employees/${id}`,{
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


const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(getEmployees.pending, filterEmployee.pending, getSpecEmployee.pending, (state) => {
          state.loading = true;
      })
      .addCase(getEmployees.fulfilled, filterEmployee.fulfilled, getSpecEmployee.fulfilled, (state, action) => {
          state.loading = false;
          state.ready = true;
          state.employees = action.payload;
          state.error = false; // Reset error status on success
      })
      .addCase(getEmployees.rejected, filterEmployee.rejected, getSpecEmployee.rejected, (state) => {
          state.loading = false;
          state.error = true;
      });
  
    }
})

export const employeeActions = employeeSlice.actions
export default employeeSlice.reducer
