import React from "react";
import { toast } from "react-toastify";

const USerRow = ({user,index,refetch}) => {
  const { email,role } = user;


  // TODO:make admin with jwt token(75.7)
  const makeAdmin=()=>{
    fetch(`http://localhost:5000/user/admin/${email}`,{
      method:'PUT',
      headers:{
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }) 
    .then(res=>{
      /*onno user admin na */ 
      if(res.status===403){
        toast.error('failed to make admin')
      }
     return res.json()
    })
    .then(data=>{
      /*75.8*/ 
      if(data.modifiedCount>0){
        // console.log("admin",data);
        toast.success(`make admin successfully `)
        refetch() 
      }

    })
  }

  return (
    <tr>
      <th>{index+1}</th>
      <td>{email}</td>

      {/*TODO:make admin button tiny (75.7) */}
      <td>
        {role!== 'admin' && <button onClick={makeAdmin} class="btn btn-xs">Make admin</button>}
      </td>

      <td>
        <button class="btn btn-xs">Remove user</button>
      </td>
    </tr>
  );
};

export default USerRow;
