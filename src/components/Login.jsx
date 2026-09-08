import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';

const Login = () => {
  const [email, setemailID] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin,setisLogin]=useState(true);
  const [firstName, setfirstName] = useState("");
  const [LastName, setLastName] = useState("");

  const handleLoginClick = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL + "/login", {
        email, password
      }, {
        withCredentials: true
      });
      console.log("Login response data:", res.data);
dispatch(addUser(res.data));
      
      navigate("/");
    } catch (err) {
      setError(err.response?.data || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  const handleSignUpClick=async (e)=>{
    e.preventDefault();
    try {
      const res=await axios.post(BASE_URL+"/signup",{firstName,LastName,email,password},{withCredentials:true})
      console.log(res.data);
      dispatch(addUser(res?.data?.data));
       return navigate("/profile");

    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className='flex justify-center m-4'>
      <div>
      <form onSubmit={isLogin?handleLoginClick:handleSignUpClick}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-2xl">{isLogin?"Login":"Signup"}</legend>
        
          { !isLogin &&   <> <label className="label">First Name</label>
          <input type="text" className="input" placeholder="first Name" value={firstName} onChange={(e) => setfirstName(e.target.value)} />

          <label className="label">Last Name</label>
          <input type="text" className="input" placeholder="Last Name" value={LastName} onChange={(e) => setLastName(e.target.value)} /></>
          }
          <label className="label">Email</label>
          <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setemailID(e.target.value)} />

          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} />
        

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button className="btn btn-neutral mt-4" type="submit " disabled={loading}>
            {isLogin? "Login" : "Sign Up"}
          </button>
        </fieldset>
      </form>
      
      <p className='cursor-pointer' onClick={()=>{setisLogin((value)=>!value)}}>{isLogin?"New User? Signup here":"Already a user? Login here"}</p>
      </div>
    </div>
  )
}

export default Login