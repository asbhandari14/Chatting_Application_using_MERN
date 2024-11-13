import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage'

const Messages = () => {

    const {authUser, selectedUser} = useSelector(store=>store.user);
    const {messages} = useSelector(store=>store.message);


    useGetMessages();
    useGetRealTimeMessage();

    return (
        <>
            <div className='w-full h-full flex flex-col pb-16 pt-6 overflow-auto'>
            {
                messages && messages?.map((currElem)=>{
                    return(
                        <Message key={currElem?._id} senderMssg={(authUser?._id == currElem?.senderId)?currElem?.message:""} receiverMssg={(authUser?._id != currElem?.senderId)?currElem?.message:""}/>
                    )
                })
            }
            </div>
        </>
    )
}

export default Messages
