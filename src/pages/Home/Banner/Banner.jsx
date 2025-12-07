import React from 'react'
import gradImage from '../../../assets/images/graduation.jpg';

const Banner = () => {
  return (
   <div className=" w-[85%] mx-auto">
  <div className="hero-content text-center flex-col
   lg:flex-row ">
     <img 
      src={gradImage}
      className="max-w-lg rounded-lg shadow-2xl"
    />
    <div className="max-w-md">
      <h1 className="text-2xl font-bold">
        Empowering Students With Access
       to Global <span className="text-green-400">Scholarship</span> Opportunities</h1>
      <p className="py-2 text-lg">
      Explore verified scholarships from trusted institutions worldwide. Easily search, compare, and apply to the programs 
      that align with your academic goals and financial needs.
      </p>
      <button className="btn btn-secondary">Search Scholarships</button>
    </div>
  </div>
</div>
  );
};

export default Banner;