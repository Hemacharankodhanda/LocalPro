import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoginModal from './components/Modals/LoginModal';
import SignupModal from './components/Modals/SignupModal';
import ServiceRequestModal from './components/Modals/ServiceRequestModal';
import WorkerSelectionModal from './components/Modals/WorkerSelectionModal';
import WorkerPortfolioModal from './components/Modals/WorkerPortfolioModal';
import { auth, onAuthStateChanged } from './lib/firebase';

function App() {
  const [user, setUser] = useState(null);
  
  // Modals state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [activeServiceType, setActiveServiceType] = useState(null);
  const [isServiceRequestOpen, setIsServiceRequestOpen] = useState(false);
  const [isWorkerSelectionOpen, setIsWorkerSelectionOpen] = useState(false);
  
  // Portfolio state
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const openLogin = () => { setIsSignupOpen(false); setIsLoginOpen(true); };
  const openSignup = () => { setIsLoginOpen(false); setIsSignupOpen(true); };
  
  const handleCategorySelect = (categoryName) => {
    setActiveServiceType(categoryName);
    setIsServiceRequestOpen(true);
  };

  const handleServiceRequestSubmit = (formData) => {
    console.log("Service requested:", formData);
    setIsServiceRequestOpen(false);
    setIsWorkerSelectionOpen(true);
  };

  const handleViewPortfolio = (worker) => {
    setSelectedWorker(worker);
    setIsWorkerSelectionOpen(false);
    setIsPortfolioOpen(true);
  };

  const closePortfolioBackToSelection = () => {
    setIsPortfolioOpen(false);
    setIsWorkerSelectionOpen(true);
  };

  return (
    <>
      <div className="background">
        <div className="bg-pattern"></div>
      </div>
      
      <Header 
        user={user} 
        onLoginClick={openLogin} 
        onSignupClick={openSignup} 
      />
      
      <main>
        <Hero 
          onSearch={(term) => setSearchTerm(term)} 
        />
        
        <Categories 
          searchTerm={searchTerm} 
          onCategorySelect={handleCategorySelect} 
        />
        
        <HowItWorks />
        <Testimonials />
      </main>
      
      <Footer />

      {/* Modals */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSwitchToSignup={openSignup} 
      />
      
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
        onSwitchToLogin={openLogin} 
      />
      
      <ServiceRequestModal 
        isOpen={isServiceRequestOpen} 
        serviceType={activeServiceType} 
        onClose={() => setIsServiceRequestOpen(false)} 
        onSubmit={handleServiceRequestSubmit} 
      />
      
      <WorkerSelectionModal 
        isOpen={isWorkerSelectionOpen} 
        serviceType={activeServiceType} 
        onClose={() => setIsWorkerSelectionOpen(false)} 
        onBack={() => { setIsWorkerSelectionOpen(false); setIsServiceRequestOpen(true); }}
        onViewPortfolio={handleViewPortfolio}
      />
      
      <WorkerPortfolioModal 
        isOpen={isPortfolioOpen} 
        worker={selectedWorker} 
        onClose={closePortfolioBackToSelection} 
      />
    </>
  );
}

export default App;
