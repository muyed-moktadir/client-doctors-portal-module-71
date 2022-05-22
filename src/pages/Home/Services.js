import React from 'react';
import cavity from "../../assets/images/cavity.png";
import fluoride from "../../assets/images/fluoride.png";
import whitening from "../../assets/images/whitening.png";
import Service from './Service';
const Services = () => {
    const services =[
        {
            _id:1,
            name:"fluoride treatment",
            img:fluoride
        },
        {
            _id:2,
            name:"cavity filling",
            img:cavity
        },
        {
            _id:3,
            name:"teeth Whitening",
            img:whitening
        }
    ]
    return (
        <div className=' my-28'>
            <div className='text-center '>
            <h2 className='text-xl font-bold uppercase text-primary'>Our Services</h2>
            <h3 className='text-2xl'>Services We Provide</h3>
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
                {
                    services.map(service=><Service
                    key={service._id}
                    service={service}
                    ></Service>)
                }    
            </div>
        </div>
    );
};

export default Services;