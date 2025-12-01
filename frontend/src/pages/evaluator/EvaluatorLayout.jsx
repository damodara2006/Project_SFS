
import React from 'react';
import { Outlet } from 'react-router-dom';
import EvaluatorNavbar from './EvaluatorNavbar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const EvaluatorLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header/>
      <div className="flex flex-1 pt-20">
        <EvaluatorNavbar />
        <main className="flex-1 p-5">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default EvaluatorLayout;
