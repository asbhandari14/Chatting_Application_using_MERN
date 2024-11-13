import {createSlice} from "@reduxjs/toolkit";



const messageSlice = createSlice({
    name:"message",
    initialState:{
        messages:[],
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages = action.payload;
        },
    }
});

export const {setMessages, setNewMessage} = messageSlice.actions;
export default messageSlice.reducer;