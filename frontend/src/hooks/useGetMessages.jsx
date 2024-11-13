import React, { useEffect } from 'react'
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import { setMessages } from '../redux/slices/messageSlice';

const useGetMessages = () => {
    const {selectedUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/message/${selectedUser?._id}`, {withCredentials : true});

                if(response.data.success){
                    dispatch(setMessages(response?.data?.messages));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
    }, [selectedUser?._id, setMessages]);
}

export default useGetMessages