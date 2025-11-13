import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Banner from '../Components/Banner';
import HowItWorks from '../Components/HowItWorks';
import Testimonials from '../Components/Testimonials';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>

            <Outlet></Outlet>

            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
            
            <Footer></Footer>
            
        </div>
    );
};

export default HomeLayout;