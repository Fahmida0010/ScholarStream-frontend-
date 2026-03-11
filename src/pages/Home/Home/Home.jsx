import React from 'react';
import Banner from '../Banner/Banner';
import TopScholarships from '../TopScholarships/TopScholarships';
import SuccessStories from './SuccessStories';
import FAQ from './FAQ';
import Services from './Services';
import Partners from './Partners';
import Statistics from './Statistics';
import HowItWorks from './HowItWorks';
import ApplicationSelect from './ApplicationSelect';
import ScholarshipAmenities from './ScholarshipAmenities';
import StudentAchievement from './studentAchievement';


 const Home = () => {
  return (
      <div className="home-container mx-auto px-4">
  <Banner></Banner>
      <TopScholarships></TopScholarships>
      <Statistics></Statistics>
       <Partners></Partners>
    <SuccessStories></SuccessStories>
   <Services></Services>
   <HowItWorks></HowItWorks>
   <ApplicationSelect></ApplicationSelect>
   <ScholarshipAmenities></ScholarshipAmenities>
   <StudentAchievement></StudentAchievement>
  <FAQ></FAQ>
 
     </div>
     
  );
};

export default Home;