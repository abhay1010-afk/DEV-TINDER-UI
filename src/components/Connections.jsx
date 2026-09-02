import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../Utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../Utils/connectionSlice'

const Connections = () => {
  const connectionsData = useSelector((store) => store.connection)
  const dispatch = useDispatch()

  const getConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
      dispatch(addConnection(res?.data?.data))
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getConnection()
  }, [])

  if (!connectionsData) return null

  if (connectionsData.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center my-16 text-gray-500'>
        <h1 className='text-2xl font-semibold'>No Connections Found</h1>
        <p className='text-sm mt-2'>Start connecting with people to see them here.</p>
      </div>
    )
  }

  return (
    <div className='max-w-3xl mx-auto my-8 px-4'>
      <h1 className='text-3xl font-bold text-center mb-8'>Your Connections</h1>

      <div className='flex flex-col gap-4'>
        {connectionsData.map((connection) => {
          const { _id, firstName,LastName,ImgUrl,About,Age,Gender } = connection

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

           
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Connections