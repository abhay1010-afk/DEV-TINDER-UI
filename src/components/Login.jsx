import axios from 'axios';
import  { useState } from 'react'
import { BASE_URL } from '../Utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../Utils/userSlice';

const Login = () => {
  const [email,setemailID]=useState("");
  const [password,setpassword]=useState("");
  const dispatch=useDispatch();
  
  const handleLoginClick=async ()=>{
    try{
      const res=await axios.post(BASE_URL+"/login",{
        email,password
      },{
        withCredentials:true
      });
      // console.log(res.data);
      dispatch(addUser(res.data));

    }catch (err) {
    console.log(err.response?.data || err.message);
  }

  }
  return (
    <div className='flex justify-center m-6'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4  ">
  <legend className="fieldset-legend">Login</legend>

  <label className="label">Email</label>
  <input type="email" className="input" placeholder="Email" value={email} onChange={(e)=>setemailID(e.target.value)} />

  <label className="label">Password</label>
  <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setpassword(e.target.value)} />

  <button className="btn btn-neutral mt-4" onClick={handleLoginClick}>Login</button>
</fieldset>
    </div>
  )
}

export default Login
