import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/slices/userSlice';

const Sidebar = () => {
    const [selectedSidebar, setSelectedSidebar] = useState("");
    const { otherUsers } = useSelector(store => store.user);
    const [search, setSearch] = useState("");
    const [otherSearchUserArray, setOtherSearchUserArray] = useState(otherUsers || []);
    const dispatch = useDispatch();

    const handleFormSubmit=(e)=>{
        e.preventDefault()
        if(search.trim() == ""){
            setOtherSearchUserArray([...otherUsers]);
        }
        else{
            const filterSearch = otherUsers.filter((currElem)=>(currElem?.username.toLowerCase().includes(search.toLowerCase().trim())));
            setOtherSearchUserArray([...filterSearch]);
        }
    }

    useEffect(()=>{
        setOtherSearchUserArray([...otherUsers]);
    }, [otherUsers])

    return (
        <>
            <div className="sideBar_container relative w-full h-screen overflow-y-auto flex flex-col justify-start items-start px-2.5 border-r border-zinc-600">
                <form onSubmit={handleFormSubmit} className=" w-full search_container flex justify-center items-center gap-2 mt-5 mb-6  px-2 bg-[#242424] text-white rounded-md">
                    <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}}  placeholder='Search or start a new chat here' className='w-full p-2.5 outline-none bg-[#242424] text-white' />
                    <button type='submit' className='p-2.5 shadow-sm '> <IoIosSearch className='text-xl' /> </button>
                </form>

                {
                    otherSearchUserArray && otherSearchUserArray?.map((currElem) => {
                        return (
                            <div key={currElem._id} name={currElem?.username} onClick={()=>{dispatch(setSelectedUser(currElem)); setSelectedSidebar(currElem?.username);}} className={`sidebar_user_container w-full flex justify-start items-start gap-4 py-2 px-3 my-1 cursor-pointer hover:bg-[#242424] hover:text-white hover:rounded-md ${(selectedSidebar == currElem?.username)?"bg-[#242424] text-white rounded-md":""}`}>
                                <img src='../Images/userImg.jpg' className='w-[50px] rounded-full' alt="" />
                                <div className="w-full h-full flex flex-col justify-center items-start gap-0.5">
                                    <div className='w-full side_bar_first_info flex justify-between items-center text-sm '>
                                        <p className='font-semibold capitalize'>{currElem?.username}</p>
                                        {/* <p className='text-xs text-zinc-600'>{currElem?.createdAt?.substring(0, 10).split("-").reverse().join("/")}</p> */}
                                    </div>
                                    <p className='text-xs'>{currElem.fullname}</p>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default Sidebar
