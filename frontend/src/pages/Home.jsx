import React from 'react';
import { Cpu, GraduationCap, ArrowRight, Bookmark } from 'lucide-react';
import { SCHOLARSHIPS_DB } from '../mockData';

function Home({ setCurrentPage, toggleSave, savedScholarshipIds, setSelectedScholarship }) {
  const featuredScholarships = SCHOLARSHIPS_DB.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-xs sm:text-sm font-semibold text-primary-700">
              <Cpu className="w-4 h-4 animate-pulse text-primary-500" />
              <span>AI Matching Activated for 2026</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Find Your Perfect <br/>
              <span className="text-gradient">Scholarship</span> <br/>
              in Seconds
            </h1>
            <p className="text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
              Our artificial intelligence technology matches your academic metrics, family profile, and study domain to hundreds of local and global scholarships automatically.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => setCurrentPage('ai')} 
                className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold px-8 py-4 rounded-xl shadow-premium hover:shadow-premium-hover transition-all duration-200 flex items-center space-x-3">
                <Cpu className="w-5 h-5" />
                <span>Find Scholarships</span>
              </button>
              <button 
                onClick={() => setCurrentPage('search')} 
                className="bg-white hover:bg-slate-50 text-slate-700 font-bold px-8 py-4 rounded-xl border border-slate-200 shadow-sm transition hover:border-slate-300">
                Explore All
              </button>
            </div>
          </div>
          
          {/* Graphic Illustration */}
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-primary-100 rounded-full blur-3xl opacity-40 scale-75 -z-10"></div>
            <svg viewBox="0 0 500 400" className="w-full max-w-md lg:max-w-lg h-auto drop-shadow-2xl">
              {/* Base Background Board */}
              <rect x="50" y="80" width="400" height="280" rx="20" fill="white" stroke="#e2e8f0" strokeWidth="2"/>
              
              {/* Dashboard Top bar */}
              <rect x="50" y="80" width="400" height="40" rx="10" fill="#f0f7ff" />
              <circle cx="80" cy="100" r="6" fill="#ef4444" />
              <circle cx="100" cy="100" r="6" fill="#eab308" />
              <circle cx="120" cy="100" r="6" fill="#22c55e" />
              <rect x="180" y="93" width="140" height="14" rx="7" fill="#e2e8f0" />
              
              {/* Student Icon Floating card */}
              <g transform="translate(100, 160)">
                <rect width="300" height="160" rx="16" fill="white" stroke="#bae0fd" strokeWidth="1.5" />
                
                {/* Avatar area */}
                <circle cx="60" cy="65" r="30" fill="#e0effe" />
                <path d="M40 85 C 40 70, 80 70, 80 85" stroke="#0e94e7" strokeWidth="4" fill="none" />
                <circle cx="60" cy="55" r="10" fill="#0e94e7" />
                
                {/* Text bars */}
                <rect x="110" y="45" width="150" height="12" rx="6" fill="#3b82f6" />
                <rect x="110" y="65" width="100" height="8" rx="4" fill="#94a3b8" />
                <rect x="110" y="80" width="130" height="8" rx="4" fill="#cbd5e1" />
                
                {/* Match Badge */}
                <rect x="110" y="105" width="90" height="24" rx="12" fill="#dcfce7" />
                <text x="120" y="121" fill="#15803d" fontSize="11" fontWeight="bold">96% AI Match</text>
              </g>
              
              {/* Floating Small elements */}
              <g transform="translate(60, 290)" className="animate-bounce" style={{animationDuration: '3s'}}>
                <circle cx="20" cy="20" r="20" fill="#22c55e" fillOpacity="0.1"/>
                <text x="11" y="26" fill="#22c55e" fontSize="16" fontWeight="bold">✓</text>
              </g>
              <g transform="translate(370, 110)">
                <polygon points="20,5 35,35 5,35" fill="#facc15" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-y border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-primary-600 block">₹ 150 Cr+</span>
              <span className="text-sm font-medium text-slate-500">Total Funds Availed</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-primary-600 block">25,000+</span>
              <span className="text-sm font-medium text-slate-500">Verified Scholarships</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-primary-600 block">98.4%</span>
              <span className="text-sm font-medium text-slate-500">Recommendation Accuracy</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-primary-600 block">1.5 Lakh+</span>
              <span className="text-sm font-medium text-slate-500">Students Supported</span>
            </div>
          </div>
        </div>
      </section>

      {/* Steps / Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">How it Works</h2>
          <p className="text-slate-500">We make scholarship recommendation simple, personalized and instant in three stages.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative group hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
            <div className="h-14 w-14 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-primary-600 group-hover:text-white transition duration-200">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Input Profile</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Submit details like CGPA/marks, category, household income, course, and state safely on our dashboard.
            </p>
          </div>
          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative group hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
            <div className="h-14 w-14 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-primary-600 group-hover:text-white transition duration-200">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">AI Similarity Mapping</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Our algorithm filters eligibility and rates scholarship criteria mapping percentages immediately.
            </p>
          </div>
          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative group hover:shadow-premium hover:-translate-y-1 transition-all duration-300">
            <div className="h-14 w-14 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-primary-600 group-hover:text-white transition duration-200">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Apply Directly</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Examine document checklists, save upcoming deadlines, and click apply to submit official portals.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Scholarships */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="space-y-2 text-left">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Featured Opportunities</h2>
            <p className="text-slate-500 text-sm">Highly funded national and corporate scholarship funds closing applications soon.</p>
          </div>
          <button onClick={() => setCurrentPage('search')} className="text-primary-600 font-bold hover:text-primary-700 transition flex items-center space-x-1">
            <span>Browse All</span> <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredScholarships.map(sch => (
            <div 
              key={sch.id}
              className="bg-white border border-slate-200 hover:border-primary-200 rounded-2xl p-6 text-left flex flex-col justify-between shadow-sm hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="inline-flex px-2.5 py-1 text-xs rounded-full bg-primary-50 text-primary-700 border border-primary-100 font-semibold">
                    {sch.type}
                  </span>
                  <button 
                    onClick={() => toggleSave(sch.id)}
                    className="text-slate-400 hover:text-primary-500 transition">
                    <Bookmark 
                      className="w-5 h-5" 
                      fill={savedScholarshipIds.includes(sch.id) ? "currentColor" : "none"} 
                    />
                  </button>
                </div>
                <div className="space-y-2">
                  <h3 onClick={() => setSelectedScholarship(sch)} className="font-bold text-slate-800 text-base sm:text-lg leading-snug hover:text-primary-600 cursor-pointer transition line-clamp-2">
                    {sch.name}
                  </h3>
                  <p className="text-slate-400 text-xs">{sch.provider}</p>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                  {sch.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider block">Award Amount</span>
                  <span className="text-base sm:text-lg font-bold text-primary-600">{sch.amount}</span>
                </div>
                <button 
                  onClick={() => setSelectedScholarship(sch)}
                  className="bg-slate-50 hover:bg-primary-50 hover:text-primary-700 text-slate-700 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg border border-slate-200 hover:border-primary-100 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
