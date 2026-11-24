import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HelpCircle, 
  Archive, 
  LayoutDashboard, 
  Settings, 
  PlusCircle, 
  Menu, 
  X,
  Cpu
} from 'lucide-react';
import { useArchive } from '../../context/ArchiveContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { stats } = useArchive();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Living Archive', path: '/archive', icon: Archive },
    { 
      name: 'Missing Questions', 
      path: '/missing-questions', 
      icon: HelpCircle,
      badge: stats.unansweredQuestions > 0 ? stats.unansweredQuestions : undefined
    },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-charcoal-950/85 backdrop-blur-md border-b border-charcoal-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Editorial Brand */}
          <Link to="/" className="flex items-center space-x-3.5 group">
            <div className="w-10 h-10 rounded-sm border border-amber-500/40 bg-gradient-to-br from-charcoal-850 to-charcoal-900 flex items-center justify-center text-amber-400 group-hover:border-amber-400/80 group-hover:text-amber-300 transition-all shadow-amber-subtle">
              <span className="font-serif-editorial text-2xl font-light italic">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-editorial text-2xl tracking-[0.18em] font-medium text-parchment-100 uppercase group-hover:text-amber-200 transition-colors">
                Afterimage
              </span>
              <span className="text-[10px] tracking-[0.24em] text-parchment-400 uppercase -mt-0.5">
                The Living Archive
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-2 text-xs tracking-wider uppercase font-medium transition-all duration-200 rounded-sm flex items-center space-x-1.5 ${
                    active
                      ? 'text-amber-300 bg-charcoal-850/80 border-b-2 border-amber-500'
                      : 'text-parchment-300 hover:text-parchment-100 hover:bg-charcoal-850/40'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 opacity-70" />}
                  <span>{link.name}</span>
                  {link.badge !== undefined && (
                    <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Hybrid AI Ready Pill */}
            <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-full border border-charcoal-700 bg-charcoal-900/60 text-[11px] text-parchment-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <Cpu className="w-3 h-3 text-amber-400/80" />
              <span>Hybrid AI Ready</span>
            </div>

            <Link
              to="/capture"
              className="relative inline-flex items-center space-x-2 px-4 py-2 rounded-sm text-xs uppercase tracking-wider font-semibold text-charcoal-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all shadow-md shadow-amber-950/40 border border-amber-300/30 group"
            >
              <PlusCircle className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
              <span>Preserve Story</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              to="/capture"
              className="px-3 py-1.5 text-xs uppercase tracking-wider font-semibold text-charcoal-950 bg-amber-400 rounded-sm"
            >
              Preserve
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-parchment-300 hover:text-amber-300 hover:bg-charcoal-850 rounded-sm"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-charcoal-800 bg-charcoal-950/98 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-sm text-sm uppercase tracking-wider ${
                  active
                    ? 'text-amber-300 bg-charcoal-850 border-l-2 border-amber-500 font-semibold'
                    : 'text-parchment-300 hover:text-parchment-100 hover:bg-charcoal-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {Icon && <Icon className="w-4 h-4 opacity-75" />}
                  <span>{link.name}</span>
                </div>
                {link.badge !== undefined && (
                  <span className="px-2 py-0.5 text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/capture"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold text-charcoal-950 bg-amber-400"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Preserve a New Story</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
