import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WaveImage from "../components/WaveImage";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaUsers,
  FaLightbulb,
  FaTrophy,
  FaArrowRight,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";
import FAQ from "./FAQ";

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
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const pageVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideVariants = {
    enter: (direction = 1) => ({
      x: 120 * direction,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-linear-to-br from-background-light via-primary-accent/10 to-background-white text-text-primary relative"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {/* Background Pattern & Wave Image */}
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,153,0,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        <WaveImage
          src="/src/assets/kriya.png"
          alt="Decorative curved section"
          className="absolute bottom-0 left-0 w-full h-40 md:h-[180px]"
        />
      </div>

      {/* Hero Section with Carousel */}
      <section className="relative flex flex-col justify-center min-h-screen px-4 text-center overflow-hidden pt-20 md:pt-0">
        {/* Enhanced Background with Gradient and Patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-orange-50 to-yellow-50"></div>
        <div className="absolute inset-0 bg-[url(/src/assets/kriya.png)] bg-center opacity-10"></div>


        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,165,0,0.1)_25%,rgba(255,165,0,0.1)_50%,transparent_50%,transparent_75%,rgba(255,165,0,0.1)_75%)] bg-[length:20px_20px]"></div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto flex items-center">
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
              <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div
                  className="space-y-8"
                  variants={contentContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Enhanced Title with Gradient Text */}
                  <motion.h1
                    className="text-5xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent leading-tight max-w-4xl mx-auto drop-shadow-lg"
                    variants={contentItem}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    {slides[currentSlide].title}
                  </motion.h1>

                  {/* Enhanced Subtitle */}
                  <motion.h2
                    className="text-2xl md:text-4xl mb-6 text-gray-700 font-bold leading-tight max-w-4xl mx-auto"
                    variants={contentItem}
                  >
                    {slides[currentSlide].subtitle}
                  </motion.h2>

                  {/* Enhanced Description */}
                  <motion.p
                    className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto font-medium leading-relaxed"
                    variants={contentItem}
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  {/* Enhanced CTA Buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                    variants={contentItem}
                  >
                    <div className="w-full sm:w-auto">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={slides[currentSlide].ctaLink}
                          className="bg-gradient-to-br from-primary-accent to-amber-600 border border-amber-500 text-background-white font-semibold py-4 px-8 rounded-2xl shadow-card hover:shadow-card-hover hover:scale-105 transition-all duration-300 inline-flex items-center"
                        >
                          {slides[currentSlide].ctaText}
                          <FaArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                      </motion.div>
                    </div>
                    <div className="w-full sm:w-auto">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to="/about"
                          className="border-2 border-orange-500 border-primary-accent text-primary-accent font-semibold py-4 px-8 rounded-2xl hover:bg-primary-accent hover:text-background-white transition-all duration-300"
                        >
                          Learn More
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Enhanced Wave Image at Bottom */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <WaveImage
            src="/src/assets/kriya.png"
            alt="Decorative curved section"
            className="absolute bottom-0 left-0 w-full h-40 md:h-[180px] opacity-30"
          />
        </motion.div>
      </section>

      {/* Why Choose Us / Features Section */}
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

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-accent/5 via-background-white to-background-light relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary-accent/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-accent">
              How It Works
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Our streamlined process takes you from idea to impact in just a
              few simple steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 ">
            {[
              {
                step: "01",
                title: "Register & Join",
                description:
                  "Create your account and join as a student, SPOC, or evaluator.",
                icon: <FaUsers className="w-8 h-8 text-primary-accent" />,
              },
              {
                step: "02",
                title: "Explore Problems",
                description:
                  "Browse real-world challenges from industry partners.",
                icon: <FaLightbulb className="w-8 h-8 text-primary-accent" />,
              },
              {
                step: "03",
                title: "Form Teams & Innovate",
                description:
                  "Collaborate with peers to develop creative solutions.",
                icon: <FaPlay className="w-8 h-8 text-primary-accent" />,
              },
              {
                step: "04",
                title: "Submit & Get Evaluated",
                description:
                  "Present your solution and receive expert feedback.",
                icon: <FaTrophy className="w-8 h-8 text-primary-accent" />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center group shadow-2xl p-10 rounded-3xl bg-background-white  transition-all duration-500 hover:scale-105 transform relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="relative mb-6 ">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-accent to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-text-primary">
                  {item.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {item.description}
                </p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-8 h-0.5 bg-primary-accent transform -translate-x-4"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
            
      
      <FAQ />

      {/* Call to Action Section */}
      <section className="py-20 px-4  text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-orange-600"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Make an Impact?
        </motion.h2>
        <motion.p
          className="text-lg mb-8 text-gray-600"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          Join our community of innovators and start solving problems that
          matter.
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/register"
            className="bg-gradient-to-br from-primary-accent to-amber-600 border border-amber-500 text-background-white font-semibold py-4 px-8 rounded-2xl shadow-card hover:shadow-card-hover hover:scale-105 transition-all duration-300 inline-flex items-center"
          >
            Sign Up Now
          </Link>
          <Link
            to="/login"
            className="bg-white shadow-xl border-primary-accent text-primary-accent font-semibold py-4 px-8 rounded-2xl hover:bg-primary-accent hover:text-background-white transition-all duration-300 hover:scale-105 z-1"
          >
            Log In
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default Homepage;
