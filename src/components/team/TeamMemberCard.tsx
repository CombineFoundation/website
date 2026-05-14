import React from 'react';
import Image from 'next/image';

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  variant?: 'grid' | 'list';
}

const TeamMemberCard = ({ name, role, image, variant = 'grid' }: TeamMemberCardProps) => {
  if (variant === 'list') {
    return (
      <div className="flex items-start md:items-center gap-6 p-8 border-b border-gray-100 last:border-0 group bg-white">
        {/* Arrow Icon */}
        <div className="flex-shrink-0 mt-6 md:mt-0">
          <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L10 9L2 16" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Profile Image */}
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 bg-blue-50">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        {/* Content */}
        <div className="flex-1 mt-2 md:mt-0">
          <h4 className="text-xl md:text-2xl font-bold text-black mb-2">{name}</h4>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl">
            {role}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center p-4 group relative">
      {/* Arrow Icon */}
      <div className="absolute left-0 top-1/3 -translate-y-1/2">
        <svg width="8" height="12" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2L10 9L2 16" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 bg-blue-50 relative z-10">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h4 className="text-lg md:text-xl font-bold text-black leading-tight mb-1">{name}</h4>
      <p className="text-sm text-gray-800 font-medium">{role}</p>
    </div>
  );
};

export default TeamMemberCard;
