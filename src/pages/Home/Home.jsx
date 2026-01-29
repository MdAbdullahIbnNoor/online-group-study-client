import React, { useEffect } from 'react'
import Banner from './Banner';
import FeatureSection from './FeatureSection';
import Faq from './Faq';
import StatsSection from './StatsSection';
import ProcessSection from './ProcessSection';
import Newsletter from './Newsletter';
import { initReveal } from '../../utils/reveal';

const Home = () => {
  useEffect(() => {
    initReveal();
  }, []);

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <Banner></Banner>
      <StatsSection></StatsSection>
      <FeatureSection></FeatureSection>
      <ProcessSection></ProcessSection>
      <Faq></Faq>
      <Newsletter></Newsletter>
    </div>
  )
}

export default Home;