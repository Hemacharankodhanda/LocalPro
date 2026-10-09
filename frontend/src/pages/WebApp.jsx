import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../lib/db';
import { Loader2 } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';

export default function WebApp({ user }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // DEVELOPMENT OVERRIDE: Bypass login with a dummy user
    if (!user) {
      setProfile({
        uid: 'demo-123',
        email: 'demo@example.com',
        displayName: 'Demo User',
        role: 'client' // Change this to 'pro' to test the pro view
      });
      setLoading(false);
      return;
    }

    getUserProfile(user.id)
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load profile", err);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-primary w-12 h-12 mb-4" />
        <p className="text-slate-500 font-medium">Loading your workspace...</p>
      </div>
    );
  }

  const activeUser = user || { 
    email: 'demo@example.com', 
    user_metadata: { display_name: 'Demo User' } 
  };

  return <AppLayout profile={profile} user={activeUser} />;
}
