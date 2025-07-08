// import React, { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import './components/Home.css';

// const Home = () => {
//   useEffect(() => {
//     AOS.init({ duration: 800 });
//   }, []);

//   return (
//     <div className="home-page">
//       {/* Hero Section */}
//       <header className="hero-section" data-aos="fade-up">
//         <div className="hero-content">
          
//         </div>
//       </header>

//       {/* New Subheading Section
//       <section className="subheading-section" data-aos="fade-up">
        
//       </section> */}

//       {/* Call-to-Action Button Section */}
//       <section className="cta-section" data-aos="fade-up">
//         <h1>Discover Delicious Recipes</h1>
//         <p>Find the perfect recipe for every occasion</p>
//         <a href="/search" className="cta-button">Find Recipes</a>
//       </section>

//       {/* Features Section */}
//       <section className="features-section">
//         <div className="feature" data-aos="fade-up" data-aos-delay="200">
//           <img src="https://www.howsweeteats.com/wp-content/uploads/2020/10/basil-curry-chickpeas-21.jpg" alt="Variety of Recipes" className="feature-img"/>
//           <h3>Wide Variety of Recipes</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explore thousands of recipes from around the world.</p>
//         </div>
//         <div className="feature" data-aos="fade-up" data-aos-delay="400">
//           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRknSkbnnNfWBLBldnSJgnGwh6vZaDGJKUfg&s" alt="Easy to Follow" className="feature-img"/>
//           <h3>Easy to Follow</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Step-by-step instructions for every meal.</p>
//         </div>
//         <div className="feature" data-aos="fade-up" data-aos-delay="600">
//           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYRwHwe8lw7m845LbUMpUJdr9BLDVZhXUSiA&s" alt="Save Your Favorites" className="feature-img"/>
//           <h3>Save Your Favorites</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Save and organize your favorite recipes for later.</p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;









"use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import "./components/Home.css"

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    })
  }, [])

  return (
    <div className="rf-home-page">
      {/* Hero Section */}
      <section className="rf-hero-section">
        {/* Floating Elements */}
        <div className="rf-floating-element rf-floating-1">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="m16 10-4 4-4-4" />
          </svg>
        </div>
        <div className="rf-floating-element rf-floating-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <div className="rf-floating-element rf-floating-3">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </div>

        <div className="rf-hero-content">
          <div className="rf-hero-badge" data-aos="fade-up">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>Discover Amazing Recipes</span>
          </div>

          <h1 className="rf-hero-title" data-aos="fade-up" data-aos-delay="200">
            <span className="rf-gradient-text">Culinary</span>
            <br />
            <span style={{ color: "var(--rf-text-primary)" }}>Adventures</span>
            <br />
            <span className="rf-gradient-text">Await</span>
          </h1>

          <p className="rf-hero-subtitle" data-aos="fade-up" data-aos-delay="400">
            Embark on a gastronomic journey with thousands of recipes from around the world. From quick weeknight
            dinners to elaborate weekend feasts, discover your next favorite dish.
          </p>

          <div className="rf-hero-buttons" data-aos="fade-up" data-aos-delay="600">
            <a href="/search" className="rf-btn rf-btn-primary rf-btn-lg">
              Start Exploring
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12,5 19,12 12,19" />
              </svg>
            </a>
            <a href="/chatbot" className="rf-btn rf-btn-secondary rf-btn-lg">
              Ask Recipe AI
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="rf-stats-section">
        <div className="rf-stats-container">
          <div className="rf-stats-grid">
            <div className="rf-stat-card" data-aos="fade-up" data-aos-delay="100">
              <div className="rf-stat-number">10K+</div>
              <div className="rf-stat-label">Recipes</div>
            </div>
            <div className="rf-stat-card" data-aos="fade-up" data-aos-delay="200">
              <div className="rf-stat-number">50K+</div>
              <div className="rf-stat-label">Happy Cooks</div>
            </div>
            <div className="rf-stat-card" data-aos="fade-up" data-aos-delay="300">
              <div className="rf-stat-number">100+</div>
              <div className="rf-stat-label">Cuisines</div>
            </div>
            <div className="rf-stat-card" data-aos="fade-up" data-aos-delay="400">
              <div className="rf-stat-number">4.9★</div>
              <div className="rf-stat-label">Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="rf-features-section">
        <div className="rf-features-container">
          <div className="rf-features-header" data-aos="fade-up">
            <h2 className="rf-features-title">
              <span className="rf-gradient-text">Why Choose Us?</span>
            </h2>
            <p className="rf-features-subtitle">
              Experience the future of recipe discovery with our cutting-edge features
            </p>
          </div>

          <div className="rf-features-grid">
            <div className="rf-feature-card" data-aos="fade-up" data-aos-delay="200">
              <div className="rf-feature-icon rf-feature-icon-1">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="m16 10-4 4-4-4" />
                </svg>
              </div>
              <h3 className="rf-feature-title">Vast Recipe Collection</h3>
              <p className="rf-feature-description">
                Access thousands of recipes from professional chefs and home cooks worldwide. From traditional family
                recipes to modern fusion cuisine.
              </p>
            </div>

            <div className="rf-feature-card" data-aos="fade-up" data-aos-delay="400">
              <div className="rf-feature-icon rf-feature-icon-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              </div>
              <h3 className="rf-feature-title">Quick & Easy</h3>
              <p className="rf-feature-description">
                Find recipes that match your time constraints and cooking skill level. Filter by prep time, difficulty,
                and dietary preferences.
              </p>
            </div>

            <div className="rf-feature-card" data-aos="fade-up" data-aos-delay="600">
              <div className="rf-feature-icon rf-feature-icon-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="rf-feature-title">Personalized Experience</h3>
              <p className="rf-feature-description">
                Save favorites, create meal plans, and get recommendations tailored to your taste preferences and
                dietary needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rf-cta-section">
        <div className="rf-cta-container" data-aos="fade-up">
          <div className="rf-cta-card">
            <h3 className="rf-cta-title">Ready to Start Cooking?</h3>
            <p className="rf-cta-description">
              Join thousands of food enthusiasts and discover your next favorite recipe today. Start your culinary
              adventure now!
            </p>
            <a href="/search" className="rf-btn rf-btn-primary rf-btn-lg">
              Get Started Now
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12,5 19,12 12,19" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
