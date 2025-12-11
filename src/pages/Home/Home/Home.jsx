import React from 'react';
import Banner from '../Banner/Banner';
import TopScholarships from '../TopScholarships/TopScholarships';
import SuccessStories from './SuccessStories';
import FAQ from './FAQ';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner/LoadingSpinner';

// if (isLoading) return <LoadingSpinner/>

const Home = () => {
  return (
      <div className="home-container mx-auto px-4">
  <Banner></Banner>
      <TopScholarships></TopScholarships>
    <SuccessStories></SuccessStories>
   <FAQ></FAQ>

     </div>
     
  );
};

export default Home;