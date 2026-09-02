import axios, { Axios } from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../Utils/constant';
import { addRequest, removeRequest } from '../Utils/requestSlice';

const Requests = () => {
    const requestData=useSelector((store)=>store.request);
    const dispatch=useDispatch();
    const reviewRequest=async (status,_id)=>{
        try {
            const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{
                withCredentials:true,
            })
            dispatch(removeRequest(_id));

        } catch (err) {
         console.error(err.message);   
        }
    }
    const showRequests=async ()=>{
        try {
            const res=await axios.get(BASE_URL+ "/user/requests/received",{
                withCredentials:true,
            });
            console.log(res?.data?.data);
            dispatch(addRequest(res?.data?.data));
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(()=>{
        showRequests();
    },[]);
  
  if (!requestData) return null

  if (requestData.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center my-16 text-gray-500'>
        <h1 className='text-2xl font-semibold'>No Request Found</h1>
        <p className='text-sm mt-2'>Waiting for Request From Someone!!!</p>
      </div>
    )
  }

  return (
    <div className='max-w-3xl mx-auto my-8 px-4'>
      <h1 className='text-3xl font-bold text-center mb-8'>Request Received</h1>

      <div className='flex flex-col gap-4'>
        {requestData.map((request) => {
          const { _id, firstName,LastName,ImgUrl,About,Age,Gender } = request.fromuserId;

          return (
            <div
              key={_id}
              className='flex items-center gap-5 bg-blue-100 shadow-md hover:shadow-lg transition-shadow duration-200 rounded-2xl p-4 border border-gray-100'
            >
              <img
                alt={firstName}
                src={ImgUrl}
                className='w-20 h-20 rounded-full object-cover border-2 border-indigo-200'
              />

              <div className='flex-1'>
                <h2 className='text-lg font-semibold text-gray-800'>
                  {firstName} {LastName}
                  {Age && Gender && (
                    <span className='text-sm font-normal text-gray-500 ml-2'>
                      {Age}, {Gender}
                    </span>
                  )}
                </h2>
                {About && (
                  <p className='text-sm text-gray-600 mt-1 line-clamp-2'>{About}</p>
                )}
              </div>
                 <div className='flex gap-2'>
                <button className='px-4 py-1.5 cursor-pointer text-sm font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors' onClick={()=>reviewRequest("Accepted",request._id)}>
                  Accept
                </button>
                <button className='px-4 py-1.5 cursor-pointer text-sm font-medium rounded-full border-2 border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors' onClick={()=>reviewRequest("Rejected",request._id)}>
                  Reject
                </button>
              </div>


           
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Requests
