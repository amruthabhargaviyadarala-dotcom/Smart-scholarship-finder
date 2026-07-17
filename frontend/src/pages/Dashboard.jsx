import React, { useState, useEffect } from 'react';
import { Bookmark, Check, Calendar, Cpu, ArrowRight } from 'lucide-react';
import { SCHOLARSHIPS_DB } from '../mockData';

const API_BASE = '/api';

function Dashboard({ 
  savedScholarshipIds, appliedScholarshipIds, toggleSave, 
  setSelectedScholarship, setCurrentPage, apiConnected 
}) {
  const [profile, setProfile] = useState({
    username: 'jane_doe',
    qualification: 'Intermediate',
    cgpa_percentage: 85,
    category: 'General',
    annual_income: 450000,
    state: 'Maharashtra',
    gender: 'Female',
    course: 'Undergraduate',
    field_of_study: 'STEM'
  });

  const [savedItems, setSavedItems] = useState([]);
  const [appliedItems, setAppliedItems] = useState([]);

  // Load backend details if connected
  useEffect(() => {
    if (apiConnected) {
      // Profile
      fetch(`${API_BASE}/users/jane_doe`)
        .then(res => res.json())
        .then(data => setProfile(data))
        .catch(err => console.log("Profile fetch failed: ", err));

      // Saved list with full scholarship details
      fetch(`${API_BASE}/users/jane_doe/saved`)
        .then(res => res.json())
        .then(data => setSavedItems(data.map(item => item.scholarship)))
        .catch(err => console.log("Saved items fetch failed: ", err));

      // Applied list with details
      fetch(`${API_BASE}/users/jane_doe/applications`)
        .then(res => res.json())
        .then(data => setAppliedItems(data.map(item => ({
          ...item.scholarship,
          status: item.status,
          appliedDate: item.applied_date
        }))))
        .catch(err => console.log("Applications fetch failed: ", err));
    } else {
      // Local fallback mapping
      const localSaved = SCHOLARSHIPS_DB.filter(s => savedScholarshipIds.includes(s.id));
      setSavedItems(localSaved);

      const localApplied = SCHOLARSHIPS_DB.filter(s => appliedScholarshipIds.includes(s.id)).map(s => ({
        ...s,
        status: 'Applied',
        appliedDate: '2026-07-01'
      }));
      setAppliedItems(localApplied);
    }
  }, [savedScholarshipIds, appliedScholarshipIds, apiConnected]);

  // Sort scholarship deadlines
  const sortedDeadlines = SCHOLARSHIPS_DB.slice().sort((a, b) => {
    return new Date(a.lastDate) - new Date(b.lastDate);
  }).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-left">
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Student Profile Dashboard</h1>
          <p className="text-slate-500 text-sm">Review application track lists, upcoming dates, and bookmarks.</p>
        </div>
        <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
          <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
            JD
          </div>
          <div>
            <h3 className="font-semibold text-sm text-slate-800">{profile.username}</h3>
            <p className="text-slate-400 text-xs">{profile.course} Student ({profile.field_of_study || profile.fieldOfStudy || 'STEM'})</p>
          </div>
        </div>
      </div>

      {/* Stats Panels */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Saved</span>
          <span className="text-3xl font-bold text-slate-800 block">{savedItems.length}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Applied</span>
          <span className="text-3xl font-bold text-slate-800 block">{appliedItems.length}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Recommendations</span>
          <span className="text-3xl font-bold text-slate-800 block">4</span>
        </div>
        <div className="bg-gradient-to-tr from-primary-600 to-primary-500 p-6 rounded-2xl shadow-premium text-white space-y-2">
          <span className="text-xs font-semibold text-primary-100 uppercase tracking-wider block">Days to next deadline</span>
          <span className="text-3xl font-bold block">42 Days</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Applications Tracker & Saved Items */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Applied Scholarships List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Check className="text-emerald-500 w-5 h-5" />
              <span>Applications Tracker</span>
            </h2>
            {appliedItems.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {appliedItems.map(item => (
                  <div key={item.id} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                    <div>
                      <h3 onClick={() => setSelectedScholarship(item)} className="font-bold text-slate-800 text-sm sm:text-base hover:text-primary-600 cursor-pointer transition">
                        {item.name}
                      </h3>
                      <p className="text-slate-400 text-xs">{item.provider} • Applied on: {item.appliedDate}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="px-2.5 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
                        {item.status || 'Applied'}
                      </span>
                      <button onClick={() => setSelectedScholarship(item)} className="text-slate-400 hover:text-slate-600">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 space-y-2">
                <p className="text-slate-400 text-sm">No applications submitted yet.</p>
                <button onClick={() => setCurrentPage('search')} className="text-xs text-primary-600 font-bold hover:text-primary-700">
                  Search & Apply
                </button>
              </div>
            )}
          </div>

          {/* Bookmarked Items */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Bookmark className="text-primary-500 w-5 h-5" />
              <span>Saved Opportunities</span>
            </h2>
            {savedItems.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {savedItems.map(item => (
                  <div key={item.id} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                    <div>
                      <h3 onClick={() => setSelectedScholarship(item)} className="font-bold text-slate-800 text-sm sm:text-base hover:text-primary-600 cursor-pointer transition">
                        {item.name}
                      </h3>
                      <p className="text-slate-400 text-xs">{item.provider} • <span className="text-primary-600 font-semibold">{item.amount}</span></p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button onClick={() => toggleSave(item.id)} className="text-red-500 hover:text-red-600 text-xs font-bold">
                        Remove
                      </button>
                      <button 
                        onClick={() => setSelectedScholarship(item)}
                        className="px-3.5 py-1.5 text-xs bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-bold transition">
                        View & Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400 text-sm">Your bookmarks list is empty.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Deadline Timeline & AI Quick Links */}
        <div className="space-y-8">
          {/* Timeline Calendar of Deadlines */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Calendar className="w-5 h-5" />
              <span>Upcoming Deadlines</span>
            </h2>
            <div className="space-y-4">
              {sortedDeadlines.map(sch => {
                const d = new Date(sch.lastDate);
                const dateStr = d.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
                return (
                  <div key={sch.id} className="flex items-start space-x-3 border-l-2 border-primary-500 pl-3">
                    <div>
                      <h4 onClick={() => setSelectedScholarship(sch)} className="font-bold text-slate-800 text-xs sm:text-sm hover:text-primary-600 cursor-pointer transition line-clamp-1">
                        {sch.name}
                      </h4>
                      <p className="text-slate-400 text-[10px] sm:text-xs">Deadline: <span className="text-red-500 font-semibold">{dateStr}</span></p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick AI Match Launcher */}
          <div className="bg-gradient-to-tr from-primary-800 to-primary-600 rounded-2xl p-6 text-white shadow-premium space-y-4">
            <Cpu className="w-10 h-10 bg-primary-700/40 p-2 rounded-xl" />
            <h3 className="font-bold text-lg">Instant AI Profile Matcher</h3>
            <p className="text-primary-100 text-xs sm:text-sm leading-relaxed">
              Compute exact matching eligibility scores against all global scholarships using our machine learning models.
            </p>
            <button 
              onClick={() => setCurrentPage('ai')}
              className="w-full bg-white hover:bg-slate-50 text-primary-700 text-sm font-bold py-2.5 rounded-xl transition">
              Run Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
