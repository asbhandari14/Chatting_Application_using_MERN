import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice';
import messageSlice from './slices/messageSlice'
import socketSlice from './slices/socketSlice';


const store = configureStore({
  reducer: {
    user:userSlice,
    message:messageSlice,
    socket:socketSlice
  },
})

export default store