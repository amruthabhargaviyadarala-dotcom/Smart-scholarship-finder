import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Search from './pages/Search';
import Recommendation from './pages/Recommendation';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import { GraduationCap, Bell, Cpu, Home as HomeIcon, Search as SearchIcon, Grid, Info } from 'lucide-react';

const API_BASE = '/api';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [savedScholarshipIds, setSavedScholarshipIds] = useState([]);
  const [appliedScholarshipIds, setAppliedScholarshipIds] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Auto-connect to backend / check status
  useEffect(() => {
    fetch(`${API_BASE}/scholarships`)
      .then(res => {
        if (res.ok) {
          setIsBackendConnected(true);
          // Pull saved list for jane_doe
          fetch(`${API_BASE}/users/jane_doe/saved`)
            .then(r => r.json())
            .then(data => setSavedScholarshipIds(data.map(item => item.scholarship_id)))
            .catch(err => console.log("Failed fetching user bookmarks: ", err));

          // Pull applied list for jane_doe
          fetch(`${API_BASE}/users/jane_doe/applications`)
            .then(r => r.json())
            .then(data => setAppliedScholarshipIds(data.map(item => item.scholarship_id)))
            .catch(err => console.log("Failed fetching applications: ", err));
        }
      })
      .catch(err => {
        console.log("Running in offline mock mode. Backend not detected.");
        setIsBackendConnected(false);
        // Load mock presets
        setSavedScholarshipIds([1, 4]);
        setAppliedScholarshipIds([2]);
      });
  }, []);

  const toggleSave = (id) => {
    if (savedScholarshipIds.includes(id)) {
      setSavedScholarshipIds(prev => prev.filter(x => x !== id));
      if (isBackendConnected) {
        fetch(`${API_BASE}/users/jane_doe/saved/${id}`, { method: 'DELETE' })
          .catch(err => console.error("Error unsaving: ", err));
      }
    } else {
      setSavedScholarshipIds(prev => [...prev, id]);
      if (isBackendConnected) {
        fetch(`${API_BASE}/users/jane_doe/saved`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scholarship_id: id })
        }).catch(err => console.error("Error saving: ", err));
      }
    }
  };

  const applyForScholarship = (id) => {
    if (!appliedScholarshipIds.includes(id)) {
      setAppliedScholarshipIds(prev => [...prev, id]);
      if (isBackendConnected) {
        fetch(`${API_BASE}/users/jane_doe/apply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scholarship_id: id })
        }).catch(err => console.error("Error applying: ", err));
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Banner Alert */}
      {!isBackendConnected && (
        <div className="bg-amber-500 text-white text-center py-1 text-xs font-semibold px-4">
          Demo Mode: Backend server not detected. Simulating API responses locally in the browser.
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center text-white font-bold shadow-md shadow-primary-200">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent outfit-font">
                SmartScholarship
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${currentPage === 'home' ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'}`}>
                <HomeIcon className="w-4 h-4" /> <span>Home</span>
              </button>
              <button 
                onClick={() => setCurrentPage('search')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${currentPage === 'search' ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'}`}>
                <SearchIcon className="w-4 h-4" /> <span>Search</span>
              </button>
              <button 
                onClick={() => setCurrentPage('ai')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${currentPage === 'ai' ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'}`}>
                <Cpu className="w-4 h-4" /> <span>AI Recommendation</span>
              </button>
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${currentPage === 'dashboard' ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'}`}>
                <Grid className="w-4 h-4" /> <span>Dashboard</span>
              </button>
              <button 
                onClick={() => setCurrentPage('about')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${currentPage === 'about' ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'}`}>
                <Info className="w-4 h-4" /> <span>About</span>
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button onClick={() => setCurrentPage('dashboard')} className="p-2 text-slate-500 hover:text-primary-600 hover:bg-slate-50 rounded-lg relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <button 
                onClick={() => setCurrentPage('ai')}
                className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-premium hover:shadow-premium-hover transition-all duration-200">
                <Cpu className="w-4 h-4" />
                <span>AI Recommender</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Pages */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <Home 
            setCurrentPage={setCurrentPage} 
            toggleSave={toggleSave} 
            savedScholarshipIds={savedScholarshipIds}
            setSelectedScholarship={setSelectedScholarship}
          />
        )}
        {currentPage === 'about' && (
          <About setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'search' && (
          <Search 
            savedScholarshipIds={savedScholarshipIds}
            toggleSave={toggleSave}
            setSelectedScholarship={setSelectedScholarship}
            apiConnected={isBackendConnected}
          />
        )}
        {currentPage === 'ai' && (
          <Recommendation 
            savedScholarshipIds={savedScholarshipIds}
            toggleSave={toggleSave}
            setSelectedScholarship={setSelectedScholarship}
            applyForScholarship={applyForScholarship}
            appliedScholarshipIds={appliedScholarshipIds}
            apiConnected={isBackendConnected}
          />
        )}
        {currentPage === 'dashboard' && (
          <Dashboard 
            savedScholarshipIds={savedScholarshipIds}
            appliedScholarshipIds={appliedScholarshipIds}
            toggleSave={toggleSave}
            setSelectedScholarship={setSelectedScholarship}
            setCurrentPage={setCurrentPage}
            apiConnected={isBackendConnected}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-16 py-12 border-t border-slate-800 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-primary-500 flex items-center justify-center text-white font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold text-white">SmartScholarship</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                A smart, AI-powered scholarship platform matches eligible candidates with top academic funds globally, simplifying student finance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-200 uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition">Home</button></li>
                <li><button onClick={() => setCurrentPage('search')} className="hover:text-white transition">Search Scholarships</button></li>
                <li><button onClick={() => setCurrentPage('ai')} className="hover:text-white transition">AI Matches</button></li>
                <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition">About Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-200 uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><span className="hover:text-white cursor-pointer">Scholarship Authorities</span></li>
                <li><span className="hover:text-white cursor-pointer">Technical Support</span></li>
                <li><span className="hover:text-white cursor-pointer">FAQS & Help Center</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-200 uppercase tracking-wider mb-4">Get Notifications</h4>
              <p className="text-slate-400 text-sm mb-3">Subscribe to upcoming application deadline alerts.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="px-4 py-2 bg-slate-800 border border-slate-700 text-sm rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary-500 w-full"
                />
                <button className="bg-primary-600 px-4 rounded-r-lg hover:bg-primary-700 transition">
                  →
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500 flex flex-col sm:flex-row justify-between items-center">
            <p>© 2026 Smart Scholarship Finder. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedScholarship && (
        <Details 
          scholarship={selectedScholarship}
          onClose={() => setSelectedScholarship(null)}
          isSaved={savedScholarshipIds.includes(selectedScholarship.id)}
          isApplied={appliedScholarshipIds.includes(selectedScholarship.id)}
          onToggleSave={() => toggleSave(selectedScholarship.id)}
          onApply={() => {
            applyForScholarship(selectedScholarship.id);
            // trigger modal update
            setSelectedScholarship(prev => ({ ...prev }));
          }}
        />
      )}
    </div>
  );
}

export default App;
