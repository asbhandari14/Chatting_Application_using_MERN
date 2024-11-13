import React, {useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAuthUser } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const [loginInput, setLoginInput] = useState({
        username : "",
        password : "",
        gender : ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInput=(e)=>{
        const {name, value} = e.target;
        setLoginInput({...loginInput, [name] : value})
    }

    const handleForm=async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/user/login", loginInput, {headers: {"Content-Type" : "application/json"}, withCredentials: true});

            if(response.data.success){
                console.log(response.data.userInfo);
                dispatch(setAuthUser(response.data.userInfo));
                const notify=()=>{toast.success(response.data.mssg)};
                notify();
                navigate("/home");
            }
        } catch (error) {
            console.log(error);
            const notify=()=>{toast.error(error.response.data.mssg)};
            notify();
        }
    }


  return (
    <>
       <div className="login_page_container w-full min-h-screen flex justify-center items-center text-zinc-600" style={{backgroundImage: `url("../Images/bgImg.jpg")`}}>
                <form onSubmit={handleForm} className="login_box_container w-[350px] max-sm:w-[80%] flex flex-col justify-start items-start gap-4 border border-gray-400 shadow-md px-4 py-6 rounded-md bg-transparent backdrop-blur-lg">
                    <h1 className='text-center self-center text-2xl font-semibold text-black'>Login</h1>
                    <div className='w-full flex flex-col justify-start items-start'>
                        <label htmlFor="">Username</label>
                        <input type="text" name="username" value={loginInput.username} onChange={handleInput} placeholder='Enter your username' className='w-full py-1.5 px-3 border border-gray-400 rounded-md' />
                    </div>
                    <div className='w-full flex flex-col justify-start items-start'>
                        <label htmlFor="">Password</label>
                        <input type="text" name="password" value={loginInput.password} onChange={handleInput} placeholder='Enter your password' className='w-full py-1.5 px-3 border border-gray-400 rounded-md'/>
                    </div>
                    <div className='w-full flex justify-start items-center gap-2'>
                        <input type="radio" name='gender' value="male" onChange={handleInput} id='male' className='cursor-pointer' />
                        <label htmlFor="male" className='cursor-pointer'>Male</label>
                        <input type="radio" name='gender' value="female" id='female' onChange={handleInput} className='cursor-pointer' />
                        <label htmlFor="female" className='cursor-pointer'>Female</label>
                    </div>
                    <p className='w-full text-sm'>Don't have account ? <NavLink to="/signup"><span className='cursor-pointer text-blue-400 text-base hover:border-b-2 hover:border-blue-600'>Signup</span></NavLink></p>
                    <button type='submit' className='w-full mx-3 py-2 bg-red-500 active:bg-red-600 rounded-md text-white self-center'>Login</button>
                </form>
            </div>
    </>
  )
}

export default Login
