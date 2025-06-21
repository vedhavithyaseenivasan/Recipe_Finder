import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './components/Home.css';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <header className="hero-section" data-aos="fade-up">
        <div className="hero-content">
          
        </div>
      </header>

      {/* New Subheading Section
      <section className="subheading-section" data-aos="fade-up">
        
      </section> */}

      {/* Call-to-Action Button Section */}
      <section className="cta-section" data-aos="fade-up">
        <h1>Discover Delicious Recipes</h1>
        <p>Find the perfect recipe for every occasion</p>
        <a href="/search" className="cta-button">Find Recipes</a>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature" data-aos="fade-up" data-aos-delay="200">
          <img src="https://www.howsweeteats.com/wp-content/uploads/2020/10/basil-curry-chickpeas-21.jpg" alt="Variety of Recipes" className="feature-img"/>
          <h3>Wide Variety of Recipes</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explore thousands of recipes from around the world.</p>
        </div>
        <div className="feature" data-aos="fade-up" data-aos-delay="400">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRknSkbnnNfWBLBldnSJgnGwh6vZaDGJKUfg&s" alt="Easy to Follow" className="feature-img"/>
          <h3>Easy to Follow</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Step-by-step instructions for every meal.</p>
        </div>
        <div className="feature" data-aos="fade-up" data-aos-delay="600">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYRwHwe8lw7m845LbUMpUJdr9BLDVZhXUSiA&s" alt="Save Your Favorites" className="feature-img"/>
          <h3>Save Your Favorites</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Save and organize your favorite recipes for later.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
