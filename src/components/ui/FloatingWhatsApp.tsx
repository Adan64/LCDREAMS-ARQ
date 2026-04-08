'use client';

import React, { useState, useEffect } from 'react';

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Phone number configured from user requirements
  const phoneNumber = "595971954037";
  const defaultMessage = "Hola equipo de LCDREAM.ARQ, me gustaría solicitar información sobre un proyecto arquitectónico.";
  const encodedMessage = encodeURIComponent(defaultMessage);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Delay the appearance slightly so it doesn't pop up immediately on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 ease-out group"
      aria-label="Contactar por WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="w-8 h-8 fill-current"
      >
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 438c-33.2 0-66.7-8.9-95.8-25.8l-6.8-4-71.3 18.7 19-69.6-4.4-7C45.3 318.4 35.5 281.9 35.5 244c0-103.5 84.1-188 188.5-188 50.3 0 97.6 19.6 133.1 55.1 35.5 35.5 55.2 82.8 55.2 133.2 0 103.6-84.1 188.1-188.4 188.1zM327.3 306.9c-5.7-2.8-33.6-16.6-38.8-18.5-5.2-1.9-9-2.8-12.8 2.8-3.8 5.7-14.7 18.5-18 22.3-3.3 3.8-6.6 4.3-12.3 1.4-5.7-2.8-24-8.8-45.8-28.2-16.9-15-28.4-33.6-31.7-39.3-3.3-5.7-.4-8.8 2.5-11.6 2.6-2.6 5.7-6.6 8.5-10 2.8-3.3 3.8-5.7 5.7-9.5 1.9-3.8.9-7.1-.5-10s-12.8-30.8-17.5-42.2c-4.6-11.1-9.3-9.6-12.8-9.8-3.3-.2-7.1-.2-10.9-.2-3.8 0-10 1.4-15.2 7.1-5.2 5.7-20 19.4-20 47.4 0 28 20.4 55.1 23.2 58.8 2.8 3.8 40.2 61.3 97.2 85.9 13.6 5.8 24.2 9.3 32.5 11.9 13.6 4.3 26.1 3.7 35.9 2.2 10.9-1.6 33.6-13.7 38.4-27 4.8-13.3 4.8-24.6 3.3-27-.8-2.6-3-4-8.8-6.8z" />
      </svg>
      {/* Tooltip on hover */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-semibold py-1.5 px-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 font-body whitespace-nowrap shadow-lg">
        Contactar equipo
      </span>
      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></span>
    </a>
  );
};

export default FloatingWhatsApp;
