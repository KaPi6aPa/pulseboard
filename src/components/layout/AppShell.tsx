import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useT } from '../../i18n/useT';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LogOut, LayoutDashboard, Settings, Activity } from 'lucide-react';

export const AppShell: React.FC = () => {
  const { t } = useT();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/app" className="flex items-center space-x-2 text-slate-900">
              <Activity className="h-6 w-6 text-slate-900" />
              <span className="font-bold text-lg tracking-tight">PulseBoard</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1">
              <Link 
                to="/app" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/app') ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                <div className="flex items-center space-x-2">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>{t('dashboard.habits_card_title')}</span>
                </div>
              </Link>
              <Link 
                to="/settings" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/settings') ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>{t('settings.title')}</span>
                </div>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-red-600 transition-colors"
              title={t('common.logout')}
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 pb-safe">
        <div className="flex justify-around items-center h-16">
          <Link to="/app" className={`flex flex-col items-center p-2 ${isActive('/app') ? 'text-slate-900' : 'text-slate-400'}`}>
            <LayoutDashboard className="h-6 w-6" />
            <span className="text-xs mt-1">{t('dashboard.habits_card_title')}</span>
          </Link>
          <Link to="/settings" className={`flex flex-col items-center p-2 ${isActive('/settings') ? 'text-slate-900' : 'text-slate-400'}`}>
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1">{t('settings.title')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};