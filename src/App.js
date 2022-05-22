import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './pages/Shared/Navbar/Navbar';
import Login from './pages/Login/Login';
import Appointment from './pages/Appointment/Appointment';
import SignUp from './pages/Login/SignUp';
import RequireAuth from './pages/Login/RequireAuth';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard/Dashboard';
import MyAppointments from './pages/Dashboard/MyAppointments';
import MyReview from './pages/Dashboard/MyReview';
import MyHistory from './pages/Dashboard/MyHistory';
import Users from './pages/Dashboard/Users';
import RequireAdmin from './pages/Login/RequireAdmin';



function App() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar></Navbar>
   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />

        <Route path="appointment" element={
        <RequireAuth>
          <Appointment/>
        </RequireAuth>
      } />

      {/* TODO:dashboard (74.7) */}
        <Route path="dashboard" element={
        <RequireAuth>
          <Dashboard/>
        </RequireAuth>
      }>
        <Route index element={<MyAppointments></MyAppointments>}></Route>
        <Route path='review' element={<MyReview></MyReview>}></Route>
        <Route path='myhistory' element={<MyHistory></MyHistory>}></Route>
        <Route path='users' element={
        <RequireAdmin>
          <Users></Users>
          </RequireAdmin>}></Route>
      </Route>


        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
