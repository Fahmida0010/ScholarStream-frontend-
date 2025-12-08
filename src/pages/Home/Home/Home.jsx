import React from 'react';
import Banner from '../Banner/Banner';
import TopScholarships from '../TopScholarships/TopScholarships';
import SuccessStories from './SuccessStories';
import FAQ from './FAQ';

const Home = () => {
  return (
    <div>
  <Banner></Banner>
      <TopScholarships></TopScholarships>
    <SuccessStories></SuccessStories>
   <FAQ></FAQ>

     </div>
     
  );
};

export default Home;