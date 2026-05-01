import React from 'react';

const Topbar = () => {
  return (
    <div className="bg-navy text-white py-1 px-4 text-sm hidden md:block">
      <div className="container mx-auto flex justify-between items-center">
        <p>Announcement: Register for our upcoming Web Development Bootcamp!</p>
        <div className="flex gap-4">
          <button className="hover:text-orange transition-colors">Login</button>
          <button className="hover:text-orange transition-colors">Register</button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
