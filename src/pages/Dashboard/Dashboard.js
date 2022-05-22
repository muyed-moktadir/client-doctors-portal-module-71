import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';


const Dashboard = () => {
  /*admin check er jonno ei duita lagbe 75.8*/ 
  const [user] = useAuthState(auth)
  const [admin] = useAdmin(user)
  console.log(admin);

    return (
        <div class="drawer drawer-mobile">
        <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          {/* <!-- Page content here --> */}
          <h2 className='text-3xl text-green-600 font-bold'>Welcome To Dashboard</h2>
          <Outlet></Outlet>

        
        </div> 
        <div class="drawer-side">
          <label for="dashboard-sidebar" class="drawer-overlay"></label> 
          <ul class="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            {/* TODO:74.7 outlet add dashbo */}
            <li><Link to="/dashboard" >My Appointments</Link></li>
            <li><Link to="/dashboard/review">My reviews</Link></li>
            <li><Link to="/dashboard/myhistory">My history</Link></li>
           {/* <li><Link to="/dashboard/users">All Users</Link></li> */}

          {/* admin hole link ta dekhabe na hole dekhabe na 75.8*/}

          {admin && <li><Link to="/dashboard/users">All Users</Link></li>}
          </ul>
            
          
        
        </div>
      </div>
    );
};

export default Dashboard;