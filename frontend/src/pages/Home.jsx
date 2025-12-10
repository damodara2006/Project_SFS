/**
 * @file Home.jsx
 * @description The main landing page of the application, accessible to all users.
 */
import { Link } from "react-router-dom";
import WaveImage from "../components/WaveImage";
import { motion } from "framer-motion";
import {
  FaPlay,
  FaUsers,
  FaLightbulb,
  FaTrophy,
  FaArrowRight,
  FaQuoteLeft,
  FaStar,
  FaCheckCircle,
  FaRocket,
  FaGlobe,
  FaAward,
  FaChevronRight,
} from "react-icons/fa";
import FAQ from "./FAQ";
import Header from "../components/Header";
import Footer from "../components/Footer";
const Homepage = () => {

  const pageVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };



  return (
    <motion.div
      className="min-h-screen bg-linear-to-br from-background-light via-primary-accent/10 to-background-white text-text-primary relative"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <Header/>
      {/* Background Pattern & Wave Image */}
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,153,0,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        {/* <WaveImage
          src="/src/assets/kriya.png"
          alt="Decorative curved section"
          className="absolute bottom-0 left-0 w-full h-40 md:h-[180px]"
        /> */}
      </div>

      {/* Professional Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-100 to-orange-50 min-h-screen flex items-center justify-center px-4 pt-20 md:pt-0 overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,153,0,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1)_0%,transparent_50%)]"></div>
        </div>

        {/* Floating Color Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full blur-2xl opacity-30"
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-orange-200 to-amber-300 rounded-lg rotate-45 blur-xl opacity-25"
            animate={{
              rotate: [45, 135, 45],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full blur-2xl opacity-20"
            animate={{
              y: [0, 25, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="text-center lg:text-left space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Main Heading */}
              <div className="space-y-4">
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="text-orange-600">
                    Solve for
                  </span>
                  <span className="block text-black">
                    Sakthi
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Empowering innovation through collaborative problem-solving in
                  <span className="text-black font-semibold"> manufacturing</span> and
                  <span className="text-orange-600 font-semibold"> technology</span>
                </motion.p>
              </div>

              {/* Key Benefits */}
              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <FaCheckCircle className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-800">Real-world challenges</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <FaCheckCircle className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-800">Expert mentorship</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <FaCheckCircle className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-800">Industry partnerships</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center group"
                >
                  Get Started Today
                  <FaArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/student"
                  className="border-2 border-orange-300 hover:border-orange-500 text-orange-700 hover:text-orange-800 font-semibold py-4 px-8 rounded-xl hover:bg-orange-50 transition-all duration-300 inline-flex items-center justify-center"
                >
                  View Challenges
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Content - Stats & Visual */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Statistics Cards */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    number: "500+",
                    label: "Active Students",
                    icon: <FaUsers className="w-6 h-6" />,
                    bgColor: "from-gray-500 to-gray-600",
                    bgLight: "bg-gray-50",
                    textColor: "text-gray-600"
                  },
                  {
                    number: "50+",
                    label: "Problem Statements",
                    icon: <FaLightbulb className="w-6 h-6" />,
                    bgColor: "from-orange-500 to-orange-600",
                    bgLight: "bg-orange-50",
                    textColor: "text-orange-600"
                  },
                  {
                    number: "25+",
                    label: "Industry Partners",
                    icon: <FaGlobe className="w-6 h-6" />,
                    bgColor: "from-orange-500 to-orange-600",
                    bgLight: "bg-red-50",
                    textColor: "text-gray-600"
                  },
                  {
                    number: "100%",
                    label: "Success Rate",
                    icon: <FaTrophy className="w-6 h-6" />,
                    bgColor: "from-gray-500 to-gray-600",
                    bgLight: "bg-gray-50",
                    textColor: "text-gray-600"
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-${stat.textColor.split('-')[1]}-200`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-gradient-to-br ${stat.bgColor} rounded-xl text-white shadow-lg`}>
                        {stat.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Indicators */}
              <motion.div
                className="bg-gradient-to-r from-white via-gray-50 to-gray-50 p-6 rounded-2xl shadow-lg border-2 border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-white-500 to-orange-600 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-lg">
                        {i}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Trusted by Industry Leaders</div>
                    <div className="text-sm text-gray-600 font-medium">Join 500+ innovators</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 font-medium">4.9/5 rating</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave */}
        <motion.div
          className="absolute bottom-0 left-0 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <WaveImage
            src="/src/assets/kriya.png"
            alt="Decorative wave"
            className="w-full h-32 md:h-48"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                number: "01",
                title: "Innovative Challenges",
                description: "Tackle real-world problems in manufacturing, supply chain, and more with cutting-edge technology.",
                icon: <FaLightbulb className="w-8 h-8 text-primary-accent" />,
              },
              {
                number: "02",
                title: "Collaborative Teams",
                description: "Form teams, work with mentors, and collaborate with industry experts to bring ideas to life.",
                icon: <FaUsers className="w-8 h-8 text-primary-accent" />,
              },
              {
                number: "03",
                title: "Expert Evaluation",
                description: "Get feedback from seasoned evaluators and refine your solutions for maximum impact.",
                icon: <FaCheckCircle className="w-8 h-8 text-primary-accent" />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-accent to-amber-500 rounded-full flex items-center justify-center shadow-xl border-background-white z-10">
                  <span className="text-background-white font-bold text-sm">
                    {item.number}
                  </span>
                </div>

                {/* Card */}
                <motion.div
                  className="bg-background-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-primary-accent/10 to-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    {item.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-4 text-text-primary group-hover:text-primary-accent transition-colors duration-300 text-center">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-center">
                    {item.description}
                  </p>
                </motion.div>
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

          {/* Timeline Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Horizontal Timeline Line (Desktop) */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary-accent via-amber-500 to-primary-accent rounded-full"></div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
              {[
                {
                  step: 1,
                  title: "Register & Join",
                  description:
                    "Create your account and join as a student, SPOC, or evaluator.",
                  icon: <FaUsers className="w-6 h-6 text-primary-accent" />,
                },
                {
                  step: 2,
                  title: "Explore Problems",
                  description:
                    "Browse real-world challenges from industry partners.",
                  icon: <FaLightbulb className="w-6 h-6 text-primary-accent" />,
                },
                {
                  step: 3,
                  title: "Form Teams & Innovate",
                  description:
                    "Collaborate with peers to develop creative solutions.",
                  icon: <FaPlay className="w-6 h-6 text-primary-accent" />,
                },
                {
                  step: 4,
                  title: "Submit & Get Evaluated",
                  description:
                    "Present your solution and receive expert feedback.",
                  icon: <FaTrophy className="w-6 h-6 text-primary-accent" />,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="text-center group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  {/* Step Number Circle (overlaps timeline line on desktop) */}
                  <div className="relative mb-6">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-primary-accent to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-xl border-background-white group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-background-white font-bold text-xl">
                        {item.step}
                      </span>
                    </motion.div>

                    {/* Icon Circle (below step number) */}
                    <motion.div
                      className="w-12 h-12 bg-background-white rounded-full flex items-center justify-center mx-auto mt-4 shadow-lg border-2 mt-12 border-primary-accent/20 group-hover:shadow-xl transition-shadow duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <motion.div
                    className="bg-background-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1"
                    whileHover={{ y: -4 }}
                  >
                    <h3 className="text-xl font-semibold mb-3 text-text-primary group-hover:text-primary-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </motion.div>

                  {/* Arrow for mobile (vertical flow) */}
                  {i < 3 && (
                    <div className="md:hidden flex justify-center mt-8">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: (i + 1) * 0.15 }}
                      >
                        <FaArrowRight className="w-6 h-6 text-primary-accent rotate-90" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
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
      <Footer />
    </motion.div>
  );
};

export default Homepage;