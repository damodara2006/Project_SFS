import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-black">
        {/* About Section */}
            <section className="py-16 mt-19 bg-gray-800/50">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-400">About Solve for Sakthi</h2>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  Solve for Sakthi is a pioneering platform that bridges the gap between academia and industry. We provide students and professionals with opportunities to solve complex, real-world problems in manufacturing, supply chain management, and technological innovation. Our mission is to foster creativity, collaboration, and practical problem-solving skills that drive the future of industry.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">500+</div>
                    <p className="text-gray-300">Students Engaged</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">50+</div>
                    <p className="text-gray-300">Problem Statements</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">20+</div>
                    <p className="text-gray-300">Partner Colleges</p>
                  </div>
                </div>
              </div>
            </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-400">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray leading-relaxed mb-6 text-justify">
                Solve for Sakthi is dedicated to fostering a culture of
                innovation by connecting students, educators, and industry
                professionals. We provide a platform where real-world challenges
                in manufacturing, supply chain management, and technological
                advancement are tackled through collaborative problem-solving.
              </p>
              <p className="text-lg text-gray leading-relaxed text-justify">
                Our goal is to empower the next generation of innovators by
                offering opportunities to work on meaningful projects that drive
                change and create lasting impact in the industry.
              </p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-orange-400">
                What We Do
              </h3>
              <ul className="space-y-3 text-gray">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3">•</span>
                  To optimise and continuously innovate our processes.
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3">•</span> To make sure
                  our progress is sustainable.
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-3">•</span>
                  To make sure we are the company of choice for our customers.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-orange-400">
            Our Vision
          </h2>
          <p className="text-xl text-white leading-relaxed mb-8">
            To be a progressive and class-leading company in providing safety-critical components to the industry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-orange-400">
                Innovation
              </h3>
              <p className="text-gray">
                Cultivating creative solutions to complex industry challenges.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-orange-400">
                Collaboration
              </h3>
              <p className="text-gray">
                Building bridges between students, educators, and industry
                experts.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-orange-400">
                Impact
              </h3>
              <p className="text-gray">
                Creating real-world solutions that drive meaningful change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-orange-400">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-800/50 rounded-lg">
              <div className="w-24 h-24 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <h3 className="text-xl text-gray-800 mb-2">Administrators - SACL</h3>
              <p className="text-white">
                Overseeing platform operations and ensuring quality standards.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-lg">
              <div className="w-24 h-24 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">E</span>
              </div>
              <h3 className="text-xl text-gray-800 mb-2">Evaluators - SACL</h3>
              <p className="text-white">
                Industry experts providing feedback and mentorship to teams.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-lg">
              <div className="w-24 h-24 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">S</span>
              </div>
              <h3 className="text-xl text-gray-800 mb-2">SPOCs & Students</h3>
              <p className="text-white">
                College representatives and student teams driving innovation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
