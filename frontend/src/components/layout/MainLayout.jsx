import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header'; // Adjust path if needed
import Footer from '../Footer'; // Adjust path if needed

const MainLayout = () => {
  return (
    <>
      <Header />
      {/* The main content area. pt-20 adds space for the fixed header. */}
      <main className="pt-20">
        <Outlet /> {/* This is where child routes like Home, Login, etc., will be rendered */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;