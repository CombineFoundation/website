import React from 'react';

interface ProfileHeroProps {
  name: string;
  role: string;
  description: string[];
  image: string;
  reverse?: boolean;
}

const ProfileHero = ({ name, role, description, image, reverse = false }: ProfileHeroProps) => {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16 py-12`}>
      <div className="w-full md:w-1/2">
        <img 
          src={image} 
          alt={name} 
          className="rounded-3xl shadow-lg w-full object-cover aspect-[4/3]" 
        />
      </div>
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-black uppercase">{name}</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
          {description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
