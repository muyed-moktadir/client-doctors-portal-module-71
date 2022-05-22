import React from "react";
import doctor from "../../assets/images/doctor.png";
import appointment from "../../assets/images/appointment.png";
const MakeAppointment = () => {
  return (
    <section style={{
        background:`url(${appointment})`
    }} className="flex justify-center items-center mt-28">
      <div className="flex-1 hidden lg:block">
        <img className="mt-[-100px]" src={doctor} alt="" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl text-primary font-bold">Appointment</h3>
        <h2 className="text-3xl text-white py-5">Make An Appointment today</h2>
        <p className="text-white pb-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
          quisquam mollitia accusamus deserunt dolor aut minus{" "}
        </p>
      </div>
    </section>
  );
};

export default MakeAppointment;
