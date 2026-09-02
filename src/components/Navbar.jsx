import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../Utils/constant';
import { removeUser } from '../Utils/userSlice';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  console.log(user?.ImgUrl); // optional chaining — won't throw if user is null
  const handleClick=async ()=>{
   try{
    await axios.post(BASE_URL+"/logout",{},{
      withCredentials:true
    })
    dispatch(removeUser());
    navigate("/login");
   }catch(err){
    console.log(err);
   }
  }

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">🧑‍💻DEV-TINDER</Link>
        </div>

        {user && <p className='text-gray-400'>Welcome!! {user.firstName}</p>}

        <div className="flex gap-2">
          {user && (
            <div className="dropdown dropdown-end mx-8">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.ImgUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><Link to={"/connections"}>Connections</Link></li>
                <li><Link to={"/requests"}>Requests Recieved</Link></li>
                <li><a onClick={handleClick}>Logout</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar