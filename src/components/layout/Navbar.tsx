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
    { name: 'Archive', path: '/archive', icon: Archive },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
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
    <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-charcoal-850 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Editorial Brand */}
          <Link to="/" className="flex items-center space-x-3.5 group">
            <div className="w-10 h-10 rounded-xs border border-amber-500/40 bg-gradient-to-br from-charcoal-850 to-charcoal-900 flex items-center justify-center text-amber-400 group-hover:border-amber-400/80 group-hover:text-amber-300 transition-all shadow-amber-subtle">
              <span className="font-serif-editorial text-2xl font-light italic">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-editorial text-2xl tracking-[0.22em] font-light text-parchment-100 uppercase group-hover:text-amber-200 transition-colors">
                Afterimage
              </span>
              <span className="text-[9px] font-mono tracking-[0.3em] text-parchment-500 uppercase -mt-0.5">
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
                  className={`relative px-3.5 py-2 text-xs tracking-widest uppercase font-mono transition-all duration-200 rounded-xs flex items-center space-x-1.5 ${
                    active
                      ? 'text-amber-300 bg-charcoal-850/80 border-b-2 border-amber-500'
                      : 'text-parchment-400 hover:text-parchment-100 hover:bg-charcoal-850/40'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 opacity-70" />}
                  <span>{link.name}</span>
                  {link.badge !== undefined && (
                    <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Hybrid AI Ready Status Pill */}
            <Link
              to="/settings"
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full border border-charcoal-800 bg-charcoal-900/60 text-[11px] text-parchment-400 font-mono hover:border-charcoal-700 transition-colors"
              title="Firebase AI Logic Status"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <Cpu className="w-3 h-3 text-amber-400/80" />
              <span>Hybrid AI</span>
            </Link>

            <Link
              to="/capture"
              className="relative inline-flex items-center space-x-2 px-4 py-2 rounded-xs text-xs uppercase tracking-widest font-semibold text-charcoal-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 transition-all shadow-md shadow-amber-950/40 border border-amber-300/30 group"
            >
              <PlusCircle className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
              <span>Preserve</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xs text-parchment-400 hover:text-parchment-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-charcoal-850 bg-[#050505] px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xs text-xs uppercase tracking-widest font-mono ${
                  active
                    ? 'text-amber-300 bg-charcoal-900 border-l-2 border-amber-500'
                    : 'text-parchment-300 hover:bg-charcoal-900'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  {Icon && <Icon className="w-4 h-4 text-amber-400/80" />}
                  <span>{link.name}</span>
                </div>
                {link.badge !== undefined && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-charcoal-850 flex flex-col space-y-2">
            <Link
              to="/capture"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xs text-xs uppercase tracking-widest font-semibold text-charcoal-950 bg-gradient-to-r from-amber-400 to-amber-500 text-center"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Begin Preserving a Story</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
