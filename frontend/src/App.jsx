import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import "./App.css"
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client"
import { setSocket } from "./redux/slices/socketSlice";
import { setOnlineUsers } from "./redux/slices/userSlice";



const App = () => {
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();
  const {authUser} = useSelector(store=>store.user);

  useEffect(()=>{
    if(authUser){
      const socket = io("http://localhost:8000", {
        query : {
          userId : authUser?._id
        }
      })
      dispatch(setSocket(socket));

      socket.on("getOnlineUsers", (data)=>{
        dispatch(setOnlineUsers(data))
      });

      return ()=>socket.close();
    }
    else{
      socket.close();
      dispatch(setSocket(null));
    }
  }, [authUser]);

  return (
    <>
      <div className="app_container">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App;
