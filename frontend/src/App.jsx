import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Skeleton } from './components/ui/Skeleton';
import LoginModal from './components/Modals/LoginModal';
import SignupModal from './components/Modals/SignupModal';
import ServiceRequestModal from './components/Modals/ServiceRequestModal';
import WorkerSelectionModal from './components/Modals/WorkerSelectionModal';
import WorkerPortfolioModal from './components/Modals/WorkerPortfolioModal';

// Lazy load routes
const LandingPage = lazy(() => import('./pages/LandingPage'));
const WebApp = lazy(() => import('./pages/WebApp'));
const Dashboard = lazy(() => import('./pages/app/Dashboard'));
const PostJob = lazy(() => import('./pages/app/PostJob'));
const FindJobs = lazy(() => import('./pages/app/FindJobs'));
const Messages = lazy(() => import('./pages/app/Messages'));
const JobDetail = lazy(() => import('./pages/app/JobDetail'));
const ManageJob = lazy(() => import('./pages/app/ManageJob'));
const ContractView = lazy(() => import('./pages/app/ContractView'));

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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
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
    <Router>
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center p-8 bg-background"><Skeleton className="h-[400px] w-full max-w-4xl" /></div>}>
        <Routes>
          <Route 
            path="/" 
            element={<Navigate to="/app" replace />} 
          />
        <Route 
          path="/app" 
          element={<WebApp user={user} />} 
        >
          <Route index element={<Dashboard />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="find-jobs" element={<FindJobs />} />
          <Route path="messages" element={<Messages />} />
          <Route path="job/:id" element={<JobDetail />} />
          <Route path="manage-job/:id" element={<ManageJob />} />
          <Route path="contract/:id" element={<ContractView />} />
          <Route path="contracts" element={<Dashboard />} />
          <Route path="my-jobs" element={<Dashboard />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </Suspense>

      {/* Global Modals */}
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
    </Router>
  );
}

export default App;
