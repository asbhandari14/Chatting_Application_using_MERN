import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {
    const [signupInput, setSignupInput] = useState({
        fullname : "",
        username : "",
        password : "",
        confirmPassword : "",
        gender : ""
    });

    const navigate = useNavigate();


    const handleInput=(e)=>{
        const {name, value} = e.target;
        setSignupInput({...signupInput, [name] : value})
    }

    const handleForm=async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/user/register", signupInput, {headers: {"Content-Type" : "application/json"}, withCredentials: true});

            if(response.data.success){
                navigate("/")
                const notify=()=>{toast.success(response.data.mssg)};
                notify();
            }
        } catch (error) {
            console.log(error);
            const notify=()=>{toast.error(error.response.data.mssg)};
            notify();
        }
    }


    return (
        <>
            <div className="signup_page_container w-full min-h-screen flex justify-center items-center text-zinc-600" style={{backgroundImage: `url("../Images/bgImg.jpg")`}}>
                <form onSubmit={handleForm} className="signup_box_container w-[400px] max-sm:w-[80%] flex flex-col justify-start items-start gap-2 border border-gray-400 shadow-md px-4 py-6 rounded-md backdrop-blur-lg">
                    <h1 className='text-center self-center text-2xl font-semibold text-black'>Signup</h1>
                    <div className='w-full flex flex-col justify-start items-start'>
                        <label htmlFor="">Full Name</label>
                        <input type="text" name="fullname" value={signupInput.fullname} onChange={handleInput} placeholder='Enter your fullname' className='w-full py-1.5 px-3 border border-gray-400 rounded-md' />
                    </div>
                    <div className='w-full flex flex-col justify-start items-start'>
                        <label htmlFor="">Username</label>
                        <input type="text" name='username' value={signupInput.username} onChange={handleInput} placeholder='Enter your username' className='w-full py-1.5 px-3 border border-gray-400 rounded-md' />
                    </div>
                    <div className='w-full flex flex-col justify-start items-start'>
                        <label htmlFor="">Password</label>
                        <input type="text" name='password' value={signupInput.password} onChange={handleInput} placeholder='Enter your password' className='w-full py-1.5 px-3 border border-gray-400 rounded-md'/>
                    </div>
                    <div className='w-full flex flex-col justify-start items-start'>
                        <label htmlFor="">Confirm Password</label>
                        <input type="text" name="confirmPassword" value={signupInput.confirmPassword} onChange={handleInput} placeholder='Enter your confirm password' className='w-full py-1.5 px-3 border border-gray-400 rounded-md'/>
                    </div>
                    <div className='w-full flex justify-start items-center gap-2'>
                        <input type="radio" name='gender' value="male" onChange={handleInput}  id='male' />
                        <label htmlFor="male">Male</label>
                        <input type="radio" name='gender' value="female" onChange={handleInput} id='female' />
                        <label htmlFor="female">Female</label>
                    </div>
                    <p className='w-full text-sm'>Already have an account ? <NavLink to="/"><span className='cursor-pointer text-blue-400 text-base hover:border-b-2 hover:border-blue-600'>Login</span></NavLink></p>
                    <button type='submit' className='w-full mx-3 py-2 bg-red-500 active:bg-red-600 rounded-md text-white self-center'>Signup</button>
                </form>
            </div>
        </>
    )
}

export default Signup
