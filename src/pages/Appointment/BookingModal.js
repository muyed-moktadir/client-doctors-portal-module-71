import React from "react";
import { format } from "date-fns";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import {toast} from 'react-toastify';



const BookingModal = ({ treatment, setTreatment, date,refetch }) => {
  const { _id, name, slots } = treatment;
  const [user, loading, error] = useAuthState(auth);


  //TODO: booking er jonno date nibo(74.1)
  const formattedDate = format(date, "PP");



  // TODO: event handler
  const handleBooking = (event) => {
    event.preventDefault();

    // kon slot take nite chai:
    const slot = event.target.slot.value;
    // console.log(_id,name,slot);



    // TODO: Booking er jesob data database a pathabo (74.1)
    const booking = {
      treatmentId: _id,
      treatment: name,
      date: formattedDate,
      slot,
      patient: user.email,
      patientName: user.displayName,
      phone: event.target.phone.value,
    };


    //TODO: (74.2) add new booking data in 'booking' by post method server 
    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(booking)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);


        /*(74.3)*/
        if(data.success){ 
          /*dynamic vabe bole dite pari ei date a tmr appointment*/ 
          toast(`appointment is set, ${formattedDate} at ${slot}`);
        }
        else{
          toast(`you already have an appointment on, ${data.booking?.date} at ${data.booking?.slot}`);
        }

        // TODO:Call refetch to update data
        refetch();

        // modal theke data null kore modal off kore dibo
        setTreatment(null);
      });
  };




  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg text-secondary">
            Booking for :{name}
          </h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-4 justify-items-center mt-2"
          >
            <input
              disabled
              type="text"
              value={format(date, "PP")}
              className="input input-bordered w-full max-w-xs"
            />
            <select
              name="slot"
              className="select select-bordered w-full max-w-xs"
            >
              {slots.map((slot, index) => (
                <option value={slot} key={index}>
                  {slot}
                </option>
              ))}
              {/* <option>Han Solo</option>
            <option>Greedo</option> */}
            </select>
            <input
              type="name"
              name="name"
              disabled
              value={user?.displayName || ""}
              placeholder="your name"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              name="email"
              disabled
              value={user?.email || ""}
              placeholder="your email"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="phone"
              name="phone"
              placeholder="your phone no"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              value="submit"
              className="btn btn-secondary w-full max-w-xs"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
