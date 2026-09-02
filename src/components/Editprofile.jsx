import React, { useState } from 'react'
import Usercard from './Usercard';
import axios from 'axios';
import { BASE_URL } from '../Utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';

const EditProfile = ({user}) => {
      const [firstName, setFirstName] = useState(user.firstName);
  const [LastName, setLastName] = useState(user.LastName);
  const [ImgUrl, setImgUrl] = useState(user.ImgUrl);
  const [Age, setAge] = useState(user.Age);
  const [Gender,setGender]=useState(user.Gender);
  const [About,setAbout]=useState(user.About);
  const [error, setError] = useState("");
  const dispatch=useDispatch();
  const [toast,settoast]=useState(false);
  
  const saveProfile=async ()=>{
    setError("");
    try {
        const res= await axios.patch(BASE_URL+ "/Profile/edit" ,{
            firstName,LastName,ImgUrl,Age,Gender,About
        },{
            withCredentials:true,
        });
        console.log(res?.message);
        dispatch(addUser(res?.data?.data));
        settoast(true);
        setTimeout(()=>{
         settoast(false);
        },3000)
    } catch (error) {
        setError(error.message);
    }
  }
  return (
       <>
       <div className='flex justify-center'>
        <div>
             <div className='flex justify-center m-6'>
      <form >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-2xl text-center">Edit Profile</legend>

          <label className="label">First Name</label>
          <input type="text" className="input" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

          <label className="label">Last Name</label>
          <input type="text" className="input" placeholder="Last Name" value={LastName} onChange={(e) => setLastName(e.target.value)} />
           <label className="label">ImgUrl</label>
          <input type="text" className="input" placeholder="Img Url" value={ImgUrl} onChange={(e) => setImgUrl(e.target.value)} />
           <label className="label">Age</label>
          <input type="text" className="input" placeholder="Age" value={Age} onChange={(e) => setAge(e.target.value)} />
           <label className="label">Gender</label>
          <input type="text" className="input" placeholder="Gender" value={Gender} onChange={(e) => setGender(e.target.value)} />
           <label className="label">About</label>
          <input type="text" className="input" placeholder="About" value={About} onChange={(e) => setAbout(e.target.value)} />
          <button type='button' className="btn w-28 ml-50 mt-2 btn-primary " onClick={saveProfile}>Save Profile</button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}


        
        </fieldset>
      </form>
    </div>

 </div> 
 <div className='my-13'><Usercard user={{firstName,LastName,ImgUrl,Age,Gender,About}}/></div>
</div>
{toast&&<div className="toast toast-top toast-center">
  
  <div className="alert alert-success">
    <span>Profile Saved successfully.</span>
  </div>
</div>}
</>
  )
    
}

export default EditProfile
