import React, { useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import MessageContainer from '../Components/MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetOtherUsers from '../hooks/useGetOtherUsers'






const Home = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();

  useGetOtherUsers()

  useEffect(() => {
    if (!authUser) {
      navigate("/");
    }

  }, []);

  return (
    <>
      <div className="w-full h-screen grid grid-cols-[3fr_7fr] ">
        <Sidebar />
        <MessageContainer />
      </div>
    </>
  )
}

export default Home
