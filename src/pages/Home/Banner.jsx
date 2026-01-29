import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const BannerCarousel = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop",
      title: "Elevate Your Academic Potential",
      description: "Collaborate with peers on complex assignments and achieve excellence together in our structured study environment."
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop",
      title: "Seamless Group Collaboration",
      description: "Experience a platform designed for modern learners, featuring real-time updates and intuitive navigation for your study groups."
    },
    {
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop",
      title: "Master New Skills Together",
      description: "Join a vibrant community of students committed to peer-to-peer learning and mutual growth. Your success starts here."
    }
  ];

  return (
    <div className="relative overflow-hidden group">
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={5000}
        transitionTime={700}
        className="banner-carousel"
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button onClick={onClickHandler} className="absolute left-4 top-1/2 z-10 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button onClick={onClickHandler} className="absolute right-4 top-1/2 z-10 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          )
        }
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[400px] md:h-[600px]">
            <img src={slide.image} alt={slide.title} className="object-cover h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent flex items-center">
              <div className="container mx-auto px-6 md:px-12 text-left">
                <div className="max-w-2xl space-y-4">
                  <span className="inline-block px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                    Welcome to StudyBridge
                  </span>
                  <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-lg">
                    {slide.description}
                  </p>
                  <div className="flex space-x-4 pt-4">
                    <button className="btn-premium-primary text-base px-8 py-3">
                      Get Started
                    </button>
                    <button className="px-8 py-3 border border-white/30 bg-white/10 backdrop-blur-md text-white font-medium rounded-lg hover:bg-white/20 transition-all">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
