import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Briefcase, MessageSquare, Settings, LogOut, 
  Search, PlusCircle, Bell, ChevronLeft, ChevronRight, Menu, Sun, Moon, User
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';

export default function AppLayout({ profile, user }) {
  const navigate = useNavigate();
  const isPro = profile?.role === 'pro';
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('light');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navItems = isPro ? [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { name: 'Find Jobs', path: '/app/find-jobs', icon: Search },
    { name: 'My Bids', path: '/app/contracts', icon: Briefcase }, // Using existing contracts path for now
    { name: 'Active Contracts', path: '/app/contract/1', icon: Briefcase }, // Dummy path
    { name: 'Messages', path: '/app/messages', icon: MessageSquare },
  ] : [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { name: 'My Jobs', path: '/app/manage-job/1', icon: Briefcase }, // Dummy path
    { name: 'Post a Job', path: '/app/post-job', icon: PlusCircle, mobileHide: true },
    { name: 'Messages', path: '/app/messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "hidden md:flex flex-col bg-surface border-r border-border transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
          {!collapsed && (
            <span className="text-xl font-heading font-black text-text tracking-tight truncate">
              LOCAL<span className="text-primary">PRO</span>
            </span>
          )}
          {collapsed && (
            <span className="text-xl font-heading font-black text-primary mx-auto">
              LP
            </span>
          )}
        </div>
        
        <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/app'}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-colors",
                  isActive ? "bg-primary-50 text-primary" : "text-muted hover:bg-background hover:text-text",
                  collapsed && "justify-center"
                )}
                title={collapsed ? item.name : undefined}
              >
                <Icon size={20} className="shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </div>

        <div className="p-3 border-t border-border shrink-0">
          <NavLink 
            to="/app/settings" 
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-md font-medium transition-colors",
              isActive ? "bg-primary-50 text-primary" : "text-muted hover:bg-background hover:text-text",
              collapsed && "justify-center"
            )}
            title={collapsed ? "Settings" : undefined}
          >
            <Settings size={20} className="shrink-0" />
            {!collapsed && <span>Settings</span>}
          </NavLink>
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "w-full mt-2 flex items-center gap-3 px-3 py-2.5 rounded-md font-medium text-muted hover:bg-background hover:text-text transition-colors",
              collapsed && "justify-center"
            )}
          >
            {collapsed ? <ChevronRight size={20} className="shrink-0" /> : <><ChevronLeft size={20} className="shrink-0" /> <span>Collapse</span></>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Bar */}
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-4 lg:px-8 shrink-0">
          {/* Mobile Logo & Hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <span className="text-xl font-heading font-black text-text tracking-tight">
              LOCAL<span className="text-primary">PRO</span>
            </span>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <Input className="pl-10 bg-background border-transparent focus-visible:bg-surface focus-visible:border-primary" placeholder="Search jobs, pros, or messages..." />
          </div>

          <div className="flex-1 md:hidden"></div> {/* Spacer for mobile */}

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Badge variant="secondary" className="hidden sm:inline-flex uppercase tracking-wider text-[10px]">
              {isPro ? 'Pro Account' : 'Client Account'}
            </Badge>

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
            
            <Button variant="ghost" size="icon" className="relative text-muted">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-danger rounded-full border border-surface"></span>
            </Button>
            
            <div className="flex items-center gap-3 pl-2 sm:pl-4 sm:border-l border-border">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-text leading-none mb-1">
                  {profile?.displayName || user?.email?.split('@')[0]}
                </p>
                <p className="text-xs text-muted leading-none">
                  {isPro ? 'Pro' : 'Client'}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full bg-primary-50 text-primary w-9 h-9 shrink-0 relative group">
                {(profile?.displayName || user?.email || 'U').charAt(0).toUpperCase()}
                
                {/* Simple Dropdown Hover (for MVP, later replace with DropdownMenu) */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-surface border border-border rounded-md shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all z-50">
                  <div className="p-2 space-y-1">
                    <button className="w-full text-left px-3 py-2 text-sm text-text hover:bg-background rounded-md flex items-center gap-2">
                      <User size={16} /> Profile
                    </button>
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-danger hover:bg-danger/10 rounded-md flex items-center gap-2">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-8">
          <div className="mx-auto max-w-[1200px] h-full">
            <Outlet context={{ profile, user }} />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden bg-surface border-t border-border flex items-center justify-around h-16 shrink-0 pb-safe">
        {navItems.filter(i => !i.mobileHide).map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) => cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 text-muted",
                isActive && "text-primary"
              )}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Floating Action Button for Clients (Mobile) */}
      {!isPro && (
        <button 
          onClick={() => navigate('/app/post-job')}
          className="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 transition-transform active:scale-95 z-50"
        >
          <PlusCircle size={28} />
        </button>
      )}
    </div>
  );
}
