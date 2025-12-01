/**
 * @file StatCard.jsx
 * @description An animated, professional card for displaying key dashboard metrics
 *              with a dynamic and visually clear hover effect.
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the metric.
 * @param {string|number} props.value - The value of the metric.
 * @param {React.ElementType} props.icon - The icon component to display.
 * @param {string} [props.to] - The URL to link to, making the card interactive.
 * @param {number} props.delay - The animation delay for its entrance.
 * @returns {JSX.Element} The rendered StatCard component.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, to, delay }) => {
  // Common classes for the card's structure and base styling
  const cardClasses = "bg-white p-6 rounded-2xl shadow-lg overflow-hidden group transition-shadow duration-300 hover:shadow-2xl flex items-center space-x-4";

  // The internal content of the card
  const cardContent = (
    <>
      {/* Icon Container */}
      <div className="p-4 bg-brand-orange/10 rounded-xl transition-colors duration-300 group-hover:bg-brand-orange">
        {/* 
          THE FIX: The icon now scales up on hover, which is a clearer and more robust effect.
          The text color change is preserved for a complete transformation.
        */}
        <Icon 
          className="w-8 h-8 text-brand-orange transition-all duration-300  group-hover:scale-110" 
        />
      </div>
      {/* Text Content */}
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-brand-dark">{value}</p>
      </div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      className="h-full"
    >
      {to ? (
        <Link to={to} className={cardClasses}>
          {cardContent}
        </Link>
      ) : (
        <div className={cardClasses}>
          {cardContent}
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;