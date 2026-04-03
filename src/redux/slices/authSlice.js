import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi } from '../../services/api'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await loginApi(username, password)
    } catch (err) {
      return rejectWithValue(err.message || 'Login failed')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null
      state.user = null
      state.status = 'idle'
      state.error = null
      localStorage.removeItem('token')
    },
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const payload = action.payload
        const token = payload.accessToken || payload.token
        state.token = token
        state.user = {
          id: payload.id,
          username: payload.username,
          firstName: payload.firstName,
        }
        state.status = 'succeeded'
        if (token) {
          localStorage.setItem('token', token)
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Login failed'
      })
  },
})

export const { logout, clearAuthError } = authSlice.actions
export default authSlice.reducer
