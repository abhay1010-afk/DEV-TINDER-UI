    import React from 'react'

    const Usercard = ({user}) => {
        const {firstName,LastName,ImgUrl,About,Age,Gender}=user;
        const defaultImg="https://images.unsplash.com/photo-1740252117013-4fb21771e7ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMHVua25vd258ZW58MHx8MHx8fDA%3D"
        // console.log(firstName+" " +LastName)
        console.log(user);
    return (
        
        <div className="card bg-base-300 w-70 shadow-xl ">
    <figure >
        <img
    src={ImgUrl || defaultImg}
    alt={firstName}
    onError={(e) => {
        e.target.onerror = null;
        e.target.src = defaultImg;
    }}
    />
    </figure>
    <div className="card-body">
        <h2 className="card-title text-gray-500">{firstName}  {LastName}</h2>
    {Age&&Gender&&  <p>{Age+","+Gender}</p>}
        <p>{About}</p>
        <div className="card-actions justify-center my-4">
        <button className="btn btn-primary rounded-b-md">Ignore</button>
        <button className="btn btn-secondary rounded-b-md">Interested</button>

        </div>
    </div>
    </div>
        
    )
    }

    export default Usercard;
