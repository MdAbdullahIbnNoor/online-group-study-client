import React from 'react'
import Banner from './Banner';
import FeatureSection from './FeatureSection';
import Faq from './Faq';

const Home = () => {
  return (
    <div className='my-12'>
        <Banner></Banner>
        <FeatureSection></FeatureSection>
        <Faq></Faq>
    </div>
  )
}

export default Home;