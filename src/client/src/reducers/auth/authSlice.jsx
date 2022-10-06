import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const dataItem = createAsyncThunk('auth/register', async () => {
  try {
    await axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(data => {
        console.log('response', data);
        return data;
      })
      .catch(error => {
        console.log('====>', error);
      });
  } catch (error) {
    console.log(error);
  }
});
const initialState = {
  loading: false,
  userToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      // console.log("action",action)
      const { email, password } = action;
      return { ...state, email, password };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(dataItem.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(dataItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.data = state.data.concat(action.payload);
      })
      .addCase(dataItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { loginUser } = authSlice.actions;
export default authSlice.reducer;
