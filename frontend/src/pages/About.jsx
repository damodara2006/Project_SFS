import React from "react";
import { motion } from "framer-motion";
import { FaGlobe, FaHandshake, FaLightbulb, FaGraduationCap, FaBuilding, FaTools, FaChartLine, FaCheckCircle, FaLaptopCode } from "react-icons/fa";

// Animation variant for a consistent fade-in-up effect
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Color Scheme Variables (Consistent and Professional)
const ACCENT_COLOR = "text-[#FF9800]"; // Rich Amber/Orange
const ACCENT_BG = "bg-[#FF9800]";       // Rich Amber/Orange Background
const TEXT_COLOR = "text-[#212529]";   // Dark Gray/Black
const LIGHT_BG = "bg-gray-50";          // Subtle Light Gray Background

// Data for sections
const visionData = [
  { icon: FaLightbulb, title: "Pioneering", desc: "Leading the development of new technologies and smart methodologies for industry." },
  { icon: FaHandshake, title: "Collaborative", desc: "Seamlessly bridging academia and industry through shared resources and expert knowledge." },
  { icon: FaGlobe, title: "Impactful", desc: "Creating measurable, deep, and positive change in the economic and technological landscape." },
];

const impactData = [
  { icon: FaCheckCircle, title: "100+ Solutions Deployed", stat: "Problem Statements Solved", desc: "Successfully turning challenging industry needs into scalable, working prototypes and deployments." },
  { icon: FaChartLine, title: "45% Operational Efficiency", stat: "Average Improvement", desc: "Projects focused on data-driven optimization, significantly boosting production and supply chain metrics." },
  { icon: FaLaptopCode, title: "500+ Engineers Mentored", stat: "Future Innovators Trained", desc: "Empowering students with hands-on, industry-relevant experience and professional mentorship." },
];

const teamData = [
  { icon: FaBuilding, title: "Administrators - SACL", desc: "Oversee strategic operations, govern the platform, and ensure world-class quality and adherence to standards." },
  { icon: FaHandshake, title: "Evaluators & Mentors", desc: "Industry experts who guide participants, providing invaluable domain expertise and professional excellence." },
  { icon: FaGraduationCap, title: "SPOCs & Student Teams", desc: "The creative core, collaborating tirelessly to develop impactful, technologically-driven, real-world innovations." },
];

// Sub-components
const HeroSection = () => (
  <section className="py-40 bg-white shadow-xl overflow-hidden relative border-b border-gray-100">
    <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAnIGhlaWdodD0nMTAnIHZpZXdCb3g9JzAgMCAxMCAxMCc+CiAgPGcgb3BhY2l0eT0nMC41JyBmaWxsPScjNjM2MzYzJz4KICAgIDxyZWN0IHdpZHRoPScxMCcgaGVpZ2h0PScxMCcgeD0nMCcgeT0nMCcgLz4KICAgIDxwYXRoIGQ9J00xMCAwTDAgMTBWMTBaJyBzdHJva2U9JyNmZmYnIHN0cm9rZS13aWR0aD0nMC4zNScgLz4KICA8L2c+CgogIDwvc3ZnPg==')]" />
    <div className="max-w-7xl mx-auto text-center px-8 relative z-10">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        className={`text-7xl font-extrabold mb-8 ${TEXT_COLOR} tracking-tighter leading-snug`}
      >
        Driving the Future of <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
          Academia-Industry Collaboration
        </span>
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.7, delay: 0.2, ease: "easeOut" } } }}
        className={`text-2xl leading-relaxed max-w-5xl mx-auto text-gray-700 font-normal`}
      >
        <span className="font-semibold text-[#FF9800]">Solve for Sakthi</span> is the strategic nexus that transforms <span className="font-bold">real-world manufacturing, supply chain, and technology</span> challenges into high-impact learning and innovation opportunities.
      </motion.p>
      <motion.button
        initial="hidden"
        whileInView="visible"
        variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.7, delay: 0.4, ease: "easeOut" } } }}
        className={`mt-10 px-8 py-3 text-lg font-semibold rounded-full ${ACCENT_BG} text-white shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105`}
      >
        <a href="/problem"  rel="noopener noreferrer">Explore Our Challenges</a>
      </motion.button>
    </div>
  </section>
);

const MissionSection = () => (
  <section className={`py-24 px-8 ${LIGHT_BG}`}>
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
      <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} className="lg:col-span-2">
        <h2 className={`text-4xl font-bold mb-6 ${ACCENT_COLOR}`}>Our Mission</h2>
        <p className={`text-lg text-gray-700 leading-8 mb-6 text-justify`}>
          Our core mission is to <span className="font-bold">build a dynamic ecosystem</span> where innovation is a fundamental outcome. We achieve this by strategically connecting eager learners with established industry experts, effectively bridging the gap between theoretical knowledge and practical application.
        </p>
        <p className={`text-lg text-gray-700 leading-8 mb-6 text-justify`}>
          This collaborative approach transforms academic concepts into <span className="font-bold">tangible, scalable industrial solutions</span>. Through carefully structured projects, we cultivate a new generation of technical leaders prepared to drive India's manufacturing and technology transformation forward.
        </p>
        <p className={`text-lg text-gray-700 leading-8 mb-6 text-justify`}>
          We are committed to fostering an environment of continuous learning and growth, where students can develop practical skills through hands-on experience with real industrial challenges. Our platform serves as a catalyst for innovation, enabling the seamless transfer of knowledge between academia and industry. This dedication ensures that participants not only solve problems but also emerge as highly skilled professionals ready to drive industrial transformation. Ultimately, we aim to build a strong pipeline of future engineers equipped to tackle the complexities of a rapidly evolving global market.
        </p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.7, delay: 0.2, ease: "easeOut" } } }}
        className="bg-white rounded-xl shadow-2xl p-8 transform hover:scale-[1.02] transition duration-500 border-t-4 border-[#FF9800]"
      >
        <h3 className={`text-2xl font-bold mb-6 ${TEXT_COLOR}`}>Core Values</h3>
        <ul className={`space-y-5 text-gray-700 text-lg`}>
          <li className="flex items-start">
            <FaLightbulb className={`${ACCENT_COLOR} text-2xl mt-1 mr-3 flex-shrink-0`} />
            <p><b>Continuous Innovation</b>: Encouraging creative and boundary-pushing solutions in every challenge.</p>
          </li>
          <li className="flex items-start">
            <FaTools className={`${ACCENT_COLOR} text-2xl mt-1 mr-3 flex-shrink-0`} />
            <p><b>Sustainable Growth</b>: Building solutions that are robust, responsible, and capable of long-term evolution.</p>
          </li>
          <li className="flex items-start">
            <FaGraduationCap className={`${ACCENT_COLOR} text-2xl mt-1 mr-3 flex-shrink-0`} />
            <p><b>Excellence & Mentorship</b>: Delivering consistent quality and fostering trust and knowledge transfer.</p>
          </li>
        </ul>
      </motion.div>
    </div>
  </section>
);

const VisionSection = () => (
  <section className="py-24 px-8 bg-[#212529] text-white">
    <div className="max-w-7xl mx-auto text-center">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        className={`text-4xl font-bold mb-6 ${ACCENT_COLOR}`}
      >
        Our Strategic Vision
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.7, delay: 0.1, ease: "easeOut" } } }}
        className="text-xl leading-relaxed mb-16 text-gray-300 max-w-4xl mx-auto"
      >
        To establish ourselves as a premier, world-class innovation hub dedicated to empowering both industries and educational institutions to co-create high-impact, technologically advanced, and sustainable solutions globally.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {visionData.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-8 bg-white text-[#212529] rounded-2xl shadow-xl border-b-4 border-transparent hover:border-[#FF9800] transition duration-300 transform hover:scale-[1.05]"
          >
            <Icon className={`${ACCENT_COLOR} text-4xl mb-4 mx-auto`} />
            <h3 className={`text-xl font-bold mb-3 ${TEXT_COLOR}`}>{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ImpactSection = () => (
  <section className="py-24 px-8 bg-white">
    <div className="max-w-7xl mx-auto text-center">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        className={`text-4xl font-bold mb-6 ${TEXT_COLOR}`}
      >
        Our Impact in Action 🚀
      </motion.h2>
      <motion.p
        initial="hidden"
        whileInView="visible"
        variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { duration: 0.7, delay: 0.1, ease: "easeOut" } } }}
        className="text-xl leading-relaxed mb-16 text-gray-600 max-w-4xl mx-auto"
      >
        We measure our success by the real-world value we generate, delivering tangible results across the entire manufacturing and technology value chain.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {impactData.map(({ icon: Icon, title, stat, desc }, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-8 bg-white rounded-xl border border-gray-200 shadow-lg transform hover:shadow-2xl transition duration-300"
          >
            <Icon className={`${ACCENT_COLOR} text-5xl mb-4 mx-auto`} />
            <h3 className={`text-2xl font-bold mb-1 ${TEXT_COLOR}`}>{title}</h3>
            <p className={`text-4xl font-extrabold mb-3 ${ACCENT_COLOR}`}>{stat}</p>
            <p className="text-gray-600 text-base">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const TeamSection = () => (
  <section className={`py-24 px-8 ${LIGHT_BG}`}>
    <div className="max-w-7xl mx-auto text-center">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        className={`text-4xl font-bold mb-16 ${ACCENT_COLOR}`}
      >
        The Ecosystem & Our Contributors
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {teamData.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl border border-gray-200 shadow-md transition duration-300 hover:shadow-xl"
          >
            <Icon className={`${ACCENT_COLOR} text-4xl mb-4 mx-auto`} />
            <h3 className={`text-xl font-bold mb-3 ${TEXT_COLOR}`}>{title}</h3>
            <p className="text-gray-600 text-base">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const About = () => {
  return (
    <div className={`min-h-screen ${LIGHT_BG} ${TEXT_COLOR} scroll-smooth`}>
      <HeroSection />
      <MissionSection />
      <VisionSection />
      <ImpactSection />
      <TeamSection />
    </div>
  );
};

export default About;
