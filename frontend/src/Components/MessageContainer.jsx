import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import Messages from './Messages';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/slices/messageSlice';
import { setAuthUser } from '../redux/slices/userSlice';

const MessageContainer = () => {
  const [sendMessage, setSendMessage] = useState(null);
  const { selectedUser, authUser } = useSelector(store => store.user);
  const { messages, newMessage } = useSelector(store => store.message);

  console.log(newMessage)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async (e) => {
    try {
      const response = await axios.get("http://localhost:8000/user/logout", { withCredentials: true });

      if (response.data.success) {
        navigate("/");
        dispatch(setAuthUser({}))
        const notify = () => { toast.success(response.data.mssg) };
        notify();
      }
    } catch (error) {
      console.log(error);
      const notify = () => { toast.error(error.response.data.mssg) };
      notify();
    }
  }


  const handleSendInputSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/message/send/${selectedUser?._id}`, { message: sendMessage }, { withCredentials: true, headers: { "Content-Type": "application/json" } });

      if (response?.data?.success) {
        if (messages?.length > 0) {
          dispatch(setMessages([...messages, response?.data?.newMessage]));
        }
        else if (messages == undefined) {
          dispatch(setMessages([response?.data.newMessage]));
        }
      }
      setSendMessage("")
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <>
      <div className="relative message_container w-full flex flex-col justify-start items-start overflow-y-auto" style={{ backgroundImage: `url("../Images/bgImg.jpg")` }}>
        <div className="message_container_header w-full flex justify-start items-center gap-4 px-4 py-3 bg-[#242424] text-white">
          <img src={"../Images/userImg.jpg"} className='w-[40px] rounded-full' alt="" />
          <div className="header_info flex flex-col text-sm">
            <p className='font-semibold'>{(authUser?.username).toUpperCase()}</p>
            {/* <p className='text-xs'>I wanted to become the Full Stack Software Developer</p> */}
          </div>
          <button onClick={logoutHandler} className='absolute top-3 right-2 bg-purple-500 text-white py-2 px-8 rounded-md'>Logout</button>
        </div>

        <Messages className="w-full h-full" />

        <form onSubmit={handleSendInputSubmit} className="message_container_send_mssg_box w-[98%] flex justify-between items-center gap-1 absolute bottom-1 left-2 rounded-lg">
          <input name="message" value={sendMessage} onChange={(e) => { setSendMessage(e.target.value) }} type="text" placeholder='Send a message' className='w-full p-3 outline-none rounded-md bg-[#242424] text-white  border border-zinc-600' />
          <button type='submit' className='p-4 bg-purple-600 text-white rounded-lg'><IoSend className='text-lg' /></button>
        </form>
      </div>
    </>
  )
}

export default MessageContainer
