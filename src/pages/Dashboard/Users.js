import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import USerRow from "./USerRow";

const Users = () => {
  /*TODO: get all users by react query 75.6*/

  const { data: users, isLoading,refetch } = useQuery("users", () =>
    fetch("http://localhost:5000/user",{
    
    /*admin a add er age users info secure er jonno jwt pathano(75.7)*/ 
    
    method: 'GET',
      headers:{
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
  }
  ).then((res) => res.json()));
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h2 className="text-2xl">All Users:{users.length}</h2>

      {/*TODO: table from daisy */}
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {/* last part copy and paste to userRow component For Dynamic data */}

            {users.map((user, index) => (
              <USerRow 
              key={user._id} 
              user={user} 
              index={index}
              refetch={refetch}
              ></USerRow>
            ))}

            {/* delete last two tr  */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
