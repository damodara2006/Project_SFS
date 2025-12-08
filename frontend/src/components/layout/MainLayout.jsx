import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header'; // Adjust path if needed
import Footer from '../Footer'; // Adjust path if needed

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {/* The main content area. pt-20 adds space for the fixed header. */}
      <main className="pt-20">
        {/* If explicit children are provided (used as a wrapper), render them, otherwise render nested routes via Outlet */}
        {children ? children : <Outlet />}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;