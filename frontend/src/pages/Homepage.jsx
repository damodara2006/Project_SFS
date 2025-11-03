import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WaveImage from "../components/WaveImage";
import { motion, AnimatePresence } from "framer-motion";

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      img: "/src/assets/kriya.png",
      title: "Solve for Sakthi",
      subtitle: "Empowering innovation through collaborative problem-solving",
      description:
        "Join teams, tackle real-world challenges, and drive change in manufacturing and beyond.",
      ctaText: "Get Started",
      ctaLink: "/register",
    },
    {
      img: "/src/assets/kriya.png",
      title: "Innovate Together",
      subtitle: "Connect with like-minded students and industry experts",
      description:
        "Form teams, collaborate on cutting-edge problems, and bring your ideas to life.",
      ctaText: "Explore Problems",
      ctaLink: "/student",
    },
    {
      img: "/src/assets/kriya.png",
      title: "Shape the Future",
      subtitle: "Transform manufacturing with technology and creativity",
      description:
        "Work on real industry challenges and make a lasting impact on the world.",
      ctaText: "Join Now",
      ctaLink: "/register",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Framer motion variants
  const pageVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const slideVariants = {
    enter: (direction = 1) => ({
      x: 120 * direction,
      opacity: 0,
      scale: 0.98,
    }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeInOut" } },
    exit: (direction = 1) => ({
      x: -120 * direction,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.6, ease: "easeInOut" },
    }),
  };

  const contentContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
  };

  const contentItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="min-h-screen bg-linear-to-br from-background-light via-primary-accent/10 to-background-white text-text-primary relative"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,153,0,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        <WaveImage
          src="/src/assets/kriya.png"
          alt="Decorative curved section"
          className="absolute bottom-0 left-0 w-full h-40 md:h-[180px]"
        />
      </div>

      {/* Hero Section with Carousel */}
      <section className="relative flex flex-col justify-center min-h-screen px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url(/src/assets/kriya.png)] bg-center opacity-20"></div>

        <div className="relative w-full max-w-7xl mx-auto h-full flex items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentSlide}
              className="absolute inset-0 flex items-center justify-center"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="relative z-10 max-w-5xl mx-auto px-6">
                <motion.div
                  className="space-y-8"
                  variants={contentContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h1
                    className="text-5xl md:text-7xl font-bold mb-6 text-[#f9a23ed7] leading-tight max-w-4xl mx-auto"
                    variants={contentItem}
                  >
                    {slides[currentSlide].title}
                  </motion.h1>

                  <motion.h2
                    className="text-2xl md:text-3xl mb-6 text-gray-800 font-semibold text-text-secondary leading-tight max-w-4xl mx-auto"
                    variants={contentItem}
                  >
                    {slides[currentSlide].subtitle}
                  </motion.h2>

                  <motion.p
                    className="text-lg md:text-xl text-gray-600 font-normal mb-10 text-text-tertiary leading-relaxed max-w-3xl mx-auto"
                    variants={contentItem}
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    variants={contentItem}
                  >
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to={slides[currentSlide].ctaLink}
                        className="bg-gradient-to-br from-primary-accent to-amber-600 text-background-white font-bold py-4 px-10 rounded-2xl shadow-card hover:shadow-card-hover hover:scale-105 transform transition-all duration-300 text-lg min-w-[200px] relative overflow-hidden group"
                      >
                        <span className="relative z-10">{slides[currentSlide].ctaText}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-primary-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        to="/about"
                        className="border-2 border-primary-accent text-primary-accent font-bold py-4 px-10 rounded-2xl hover:bg-primary-accent hover:text-background-white transition-all duration-300 text-lg min-w-[200px] hover:shadow-card backdrop-blur-sm bg-background-white/10"
                      >
                        Learn More
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-primary-accent" : "bg-background-white/50"}`}
              animate={index === currentSlide ? { scale: 1.25 } : { scale: 1 }}
              whileHover={{ scale: 1.4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Wave Image at Bottom */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 0.2 }} transition={{ duration: 0.8 }}>
          <WaveImage
            src="/src/assets/kriya.png"
            alt="Decorative curved section"
            className="absolute bottom-0 left-0 w-full h-40 md:h-[180px] opacity-20"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background-white via-primary-accent/5 to-background-light relative overflow-hidden">
        <div className="absolute inset-0 from-primary-accent/10 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16 text-primary-accent"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose Solve for Sakthi?
          </motion.h2>

          <div className="flex flex-col md:flex-row gap-20">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="text-center p-10 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-500 shadow-xl hover:scale-105 transform group"
                whileHover={{ scale: 1.03, y: -6 }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.12 * i }}
              >
                <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary-accent to-amber-500 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {/* icons preserved */}
                  {i === 0 ? (
                    <svg className="w-10 h-10 text-background-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ) : i === 1 ? (
                    <svg className="w-10 h-10 text-background-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ) : (
                    <svg className="w-10 h-10 text-background-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>

                <h3 className="text-xl font-semibold text-amber-600 mb-6 text-text-primary">
                  {i === 0 ? "Innovative Challenges" : i === 1 ? "Collaborative Teams" : "Expert Evaluation"}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {i === 0
                    ? "Tackle real-world problems in manufacturing, supply chain, and more with cutting-edge technology."
                    : i === 1
                    ? "Form teams, work with mentors, and collaborate with industry experts to bring ideas to life."
                    : "Get feedback from seasoned evaluators and refine your solutions for maximum impact."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-linear-to-br from-primary-accent/5 via-background-white to-primary-accent/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-accent/10 via-transparent to-primary-accent/10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 mt-[-4rem]">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8 text-primary-accent"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Make an Impact?
          </motion.h2>

          <motion.p
            className="text-lg text-text-secondary mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Join our community of innovators and start solving problems that matter.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/register"
                className="bg-gradient-to-br from-primary-accent to-amber-600 text-background-white font-semibold py-5 px-12 rounded-2xl shadow-card hover:shadow-card-hover hover:scale-105 transform transition-all duration-300 inline-flex items-center gap-3 group"
              >
                Sign Up Now
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/login"
                className="shadow-xl bg-white text-primary-accent font-semibold py-5 px-12 rounded-2xl hover:bg-primary-accent hover:text-background-white transition-all duration-300 inline-flex items-center gap-3 group hover:shadow-card"
              >
                Log In
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Homepage;
