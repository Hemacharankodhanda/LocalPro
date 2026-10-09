import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function LandingPage({ 
  user, 
  onLoginClick, 
  onSignupClick,
  onCategorySelect,
  onSearch
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (onSearch) onSearch(term);
  };

  return (
    <>
      <div className="background">
        <div className="bg-pattern"></div>
      </div>
      
      <Header 
        user={user} 
        onLoginClick={onLoginClick} 
        onSignupClick={onSignupClick} 
      />
      
      <main>
        <Hero onSearch={handleSearch} />
        
        <Categories 
          searchTerm={searchTerm} 
          onCategorySelect={onCategorySelect} 
        />
        
        <HowItWorks />
        <Testimonials />
      </main>
      
      <Footer />
    </>
  );
}
