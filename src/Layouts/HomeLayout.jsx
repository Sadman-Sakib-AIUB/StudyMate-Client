import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Banner from '../Components/Banner';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <Outlet></Outlet>
            <div className=''>
            <Footer></Footer>
            </div>
        </div>
    );
};

export default HomeLayout;