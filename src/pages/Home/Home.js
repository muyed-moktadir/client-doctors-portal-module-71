import React from 'react';
import Banner from './Banner';
import Footer from '../Shared/Navbar/Footer';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import ServiceDetails from './ServiceDetails';
import Services from './Services';
import Testimonial from './Testimonial';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Info></Info>
            <Services></Services>
            <ServiceDetails></ServiceDetails>
            <MakeAppointment></MakeAppointment>
            <Testimonial></Testimonial>
            <Footer></Footer>
        </div>
    );
};

export default Home;