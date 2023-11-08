import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const BannerCarousel = () => {
  return (
    <Carousel
      showArrows={false}
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      infiniteLoop={true}
    >
      <div>
        <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 1" />
        <div className="legend">
          <h2>Empower Your Learning Journey with Us</h2>
          <p>
            Create, share, and complete assignments with your study buddies, making learning a collaborative and rewarding experience.
          </p>
        </div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 2" />
        <div className="legend">
          <h2>Stay connected with your study group wherever you go.</h2>
          <p>
            Experience a responsive and user-friendly study platform designed for the modern learner, offering an intuitive interface for easy navigation.
          </p>
        </div>
      </div>
      <div>
        <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Slide 3" />
        <div className="legend">
          <h2>Your journey to academic excellence begins here</h2>
          <p>
            Join a community of like-minded students and learn together, fostering a supportive environment for knowledge sharing and growth.
          </p>
        </div>
      </div>
    </Carousel>
  );
};

export default BannerCarousel;
