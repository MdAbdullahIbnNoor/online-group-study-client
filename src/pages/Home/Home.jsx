import React from 'react'
import Banner from './Banner';
import FeatureSection from './FeatureSection';
import Faq from './Faq';

const Home = () => {
  return (
    <div className='max-w-screen-2xl mx-auto'>
        <Banner></Banner>
        <FeatureSection></FeatureSection>
        <Faq></Faq>
    </div>
  )
}

export default Home;