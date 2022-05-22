import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();




  //   TODO: user er booking load
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/booking?patient=${user.email}`, {
        method: "GET",
        headers: {
          /*access token ke backend a pathabo token fetch er sathe method add kore pathabo (75.4)*/
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        // .then((res) => res.json())
        // .then((data) => setAppointments(data));


        /*jwt token theke ashbe 401 403 (75.6)*/
        .then((res) => {
          console.log("res", res);
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          return res.json();
        })
        .then((data) => {
          setAppointments(data);
        });
    }
  }, [user]);




  return (
    <div>
      <h2>my Appointments:{appointments.length}</h2>
      <div class="overflow-x-auto">
        <table class="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>date</th>
              <th>time</th>
              <th>treatment</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{appointment.patientName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.slot}</td>
                <td>{appointment.treatment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
