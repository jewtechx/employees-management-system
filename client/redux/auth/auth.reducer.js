const {createSlice,createAsyncThunk} = require("@reduxjs/toolkit")

const initialState = {
    token: '',
    error:false,
    loading: false,
    success:false,
}

export const RegisterUser = createAsyncThunk('register', async (data,thunkAPI) => {
    try {
        const res = await fetch('http://localhost:5000/admin/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer 0x', // You need to provide a valid token here
          },
          body: JSON.stringify(data),
        });
    
        if (!res.ok) {
          throw new Error('Problem with registration');
        }
    
        const userData = await res.json();
        localStorage.setItem('user', JSON.stringify(userData));
    
        const { token } = userData
        return token;
      } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.message });
    }
})

export const LoginUser = createAsyncThunk('login', async (data,thunkAPI) => {
    try {
        const res = await fetch('http://localhost:5000/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: 'Bearer 0x', // You need to provide a valid token here
          },
          body: JSON.stringify(data),
        });
    
        if (!res.ok) {
          throw new Error('Problem with registration');
        }
    
        const userData = await res.json();
        
        localStorage.setItem('user', JSON.stringify(userData));
    
        const {token} = userData
        
        return token;
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.message });
      }
})
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
      reset: (state) => {
        state.token = '';
        state.error = false;
        state.loading = false;
        state.success = false;
    }
    
    },
    extraReducers: (builder) => {
        builder
            .addCase(RegisterUser.pending,(state) => {
                state.loading = true
          })
            .addCase(RegisterUser.fulfilled, (state,action) => {
                state.loading = false
                state.success = true
                state.token = action.payload
          })
            .addCase(RegisterUser.rejected,(state) => {
                state.loading = false
                state.error = true
                state.success = false
          })
            .addCase(LoginUser.pending,(state) => {
                state.loading = true
              })
            .addCase(LoginUser.fulfilled, (state,action) => {
                state.success = true
              state.loading = false
                state.token = action.payload
          })
            .addCase(LoginUser.rejected,(state) => {
                state.error = true
                state.success = false
                state.loading = false
          })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer