import React from 'react';

const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    if (password.length === 0) return 0;
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;
    if (isLongEnough && hasNumber && hasSymbol) return 3;
    if (isLongEnough || (hasNumber && hasSymbol)) return 2;
    return 1;
  };

  const strength = getStrength();
  const strengthLabels = ['Weak', 'Medium', 'Strong'];
  const strengthColors = ['#ff4d4d', '#ffd700', '#2ecc71'];

  const barColor = () => {
    if (strength === 0) return '#e0e0e0';
    if (strength === 3) return strengthColors[2];
    return strengthColors[0];
  };

  return (
    <div className="w-full ">
      <div className="relative w-full h-1 bg-gray-200 rounded-full">
        <div
          className="h-1 rounded-full"
          style={{
            width: `${(strength / 3) * 100}%`,
            backgroundColor: barColor(),
          }}
        ></div>
      </div>
      <div className="flex justify-end-safe items-center mt-1 text-[14px] font-bold">
        <span
          style={{
            color:
              strength === 0
                ? '#a0a0a0'
                : strength === 3
                ? strengthColors[2]
                : strengthColors[0],
          }}
        >
          {strength > 0 ? strengthLabels[strength - 1] : ' '}
        </span>
      </div>
      <ul className="mt-2 ml-4 text-sm text-gray-500">
        <li
          style={{
            color: password.length >= 8 ? strengthColors[2] : strengthColors[0],
          }}
        >
          At least 8 characters
        </li>
        <li
          style={{
            color: /\d/.test(password) ? strengthColors[2] : strengthColors[0],
          }}
        >
          At least one number
        </li>
        <li
          style={{
            color: /[!@#$%^&*]/.test(password)
              ? strengthColors[2]: strengthColors[0],
          }}
        >
          At least one symbol
        </li>
      </ul>
    </div>
  );
};

export default PasswordStrength;
