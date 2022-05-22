import { format } from 'date-fns';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import BookingModal from './BookingModal';
import Service from './Service';

const AvailableAppointment = ({date}) => {
    // const [ services,setServices] = useState([])
    const [treatment,setTreatment] =useState(null)
    
    /*(74.5)*/
    const formattedDate = format(date,'PP');
    // TODO:use react Query to fetch Data search by date (74.5)
    const {data: services, isLoading, refetch} = useQuery(['available',formattedDate],()=>
    
    fetch(`http://localhost:5000/available?date=${formattedDate}`)
        .then(res=>res.json())
        )


    if(isLoading){
        return <Loading></Loading>
    }
  
  
    // useEffect(()=>{
    //     fetch(`http://localhost:5000/available?date=${formattedDate}`)/*(74.5)*/
    //     .then(res=>res.json())
    //     .then(data=>setServices(data))
    // },[formattedDate])



    return (
        <div className='my-10'>
            <h4 className='text-xl text-secondary text-center my-12'>Available Appointment on {format(date, 'PP')}</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services?.map(service=><Service
                    key={service._id}
                    service={service}
                    setTreatment={setTreatment}
                    ></Service>)
                }
            </div>
            {treatment && <BookingModal
            date={date}
            treatment={treatment}
            setTreatment={setTreatment}
            refetch={refetch}
            ></BookingModal>}
        </div>
    );
};

export default AvailableAppointment;