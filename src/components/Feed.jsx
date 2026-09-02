import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../Utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../Utils/feedSlice'
import { data } from 'react-router-dom'
import Usercard from './Usercard'

const Feed = () => {
    const feed=useSelector((store)=>store.feed);
    console.log(feed);
    const dispatch=useDispatch();
    const feedData=async ()=>{
    if(feed)return;
        try{
            const res=await axios.get(BASE_URL+"/feed",{
            withCredentials:true,
        })
        // console.log(res?.data);
        dispatch(addFeed(res?.data));
    }
        catch(err){
            console.error(err);
        }
    }
    useEffect(()=>{
        feedData();
    },[]);
  return (
    feed && (
    <div className='justify-center flex my-10'>
      <Usercard user={feed[0]}/>
    </div>
  )
);
};

export default Feed
