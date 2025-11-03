import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockProblemStatements } from '../mockData';
import SearchBar from '../components/SearchBar';

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Solve for Sakthi",
      subtitle: "Empowering innovation through collaborative problem-solving",
      description: "Join teams, tackle real-world challenges, and drive change in manufacturing and beyond.",
      ctaText: "Get Started",
      ctaLink: "/register"
    },
    {
      title: "Innovate Together",
      subtitle: "Connect with like-minded students and industry experts",
      description: "Form teams, collaborate on cutting-edge problems, and bring your ideas to life.",
      ctaText: "Explore Problems",
      ctaLink: "/student"
    },
    {
      title: "Shape the Future",
      subtitle: "Transform manufacturing with technology and creativity",
      description: "Work on real industry challenges and make a lasting impact on the world.",
      ctaText: "Join Now",
      ctaLink: "/register"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-primary-accent/10 to-background-white text-text-primary relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,153,0,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      {/* Hero Section with Carousel */}
      <section className="relative flex flex-col justify-center min-h-screen px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-accent/20 via-transparent to-primary-accent/10"></div>
        <div className="absolute inset-0 bg-[url(/src/assets/kriya.png)] bg-center opacity-20"></div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-7xl mx-auto h-full flex items-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 translate-x-0 scale-100'
                  : index < currentSlide
                  ? 'opacity-0 -translate-x-full scale-95'
                  : 'opacity-0 translate-x-full scale-95'
              }`}
            >
              <div className="relative z-10 max-w-5xl mx-auto px-6">
                <div className="space-y-8">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#f9a23ed7] leading-tight max-w-4xl mx-auto">
                    {slide.title}
                  </h1>
                  <h2 className="text-2xl md:text-3xl mb-6 text-gray-800 font-semibold text-text-secondary leading-tight max-w-4xl mx-auto">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 font-normal mb-10 text-text-tertiary leading-relaxed max-w-3xl mx-auto">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link
                      to={slide.ctaLink}
                      className="bg-gradient-to-t from-primary-accent to-amber-600 text-background-white font-bold py-4 px-10 rounded-2xl shadow-card hover:shadow-card-hover hover:scale-105 transform transition-all duration-300 text-lg min-w-[200px] relative overflow-hidden group"
                    >
                      <span className="relative z-10">{slide.ctaText}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-primary-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    <Link
                      to="/about"
                      className="border-2 border-primary-accent text-primary-accent font-bold py-4 px-10 rounded-2xl hover:bg-primary-accent hover:text-background-white transition-all duration-300 text-lg min-w-[200px] hover:shadow-card backdrop-blur-sm bg-background-white/10"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-primary-accent scale-125'
                  : 'bg-background-white/50 hover:bg-background-white/75'
              }`}
            ></button>
          ))}
        </div>
      </section>

      {/* Search Section */}
      {/* <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-400">Find Your Challenge</h2>
          <p className="text-lg mb-8 text-gray-300">Search through our curated problem statements and start solving.</p>
          <SearchBar />
        </div>
      </section> */}

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background-white via-primary-accent/5 to-background-light relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-accent/10 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary-accent">Why Choose Solve for Sakthi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-10 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 shadow-2xl hover:scale-105 transform group">
              <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary-accent to-amber-500 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg className="w-10 h-10 text-background-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-6 text-text-primary">Innovative Challenges</h3>
              <p className="text-text-secondary leading-relaxed">Tackle real-world problems in manufacturing, supply chain, and more with cutting-edge technology.</p>
            </div>
           <div className="text-center p-10 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 shadow-2xl hover:scale-105 transform group">
              <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary-accent to-amber-500 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg className="w-10 h-10 text-background-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-6 text-text-primary">Collaborative Teams</h3>
              <p className="text-text-secondary leading-relaxed">Form teams, work with mentors, and collaborate with industry experts to bring ideas to life.</p>
            </div>
           <div className="text-center p-10 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 shadow-2xl hover:scale-105 transform group">
              <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary-accent to-amber-500 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <svg className="w-10 h-10 text-background-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-6 text-text-primary">Expert Evaluation</h3>
              <p className="text-text-secondary leading-relaxed">Get feedback from seasoned evaluators and refine your solutions for maximum impact.</p>
            </div>
          </div>
        </div>
      </section>

    

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-accent/5 via-background-white to-primary-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-accent/10 via-transparent to-primary-accent/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary-accent">Ready to Make an Impact?</h2>
          <p className="text-lg text-text-secondary mb-10 leading-relaxed">Join our community of innovators and start solving problems that matter.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-primary-accent to-amber-600 text-background-white font-semibold py-5 px-12 rounded-2xl shadow-card hover:shadow-card-hover hover:scale-105 transform transition-all duration-300 inline-flex items-center gap-3 group"
            >
              Sign Up Now
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Link>
            <Link
              to="/login"
              className="border-2 border-primary-accent text-primary-accent font-semibold py-5 px-12 rounded-2xl hover:bg-primary-accent hover:text-background-white transition-all duration-300 inline-flex items-center gap-3 group hover:shadow-card"
            >
              Log In
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
