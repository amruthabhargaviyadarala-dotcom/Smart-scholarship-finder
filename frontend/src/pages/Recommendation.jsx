import React, { useState } from 'react';
import { Cpu, User, Bookmark, Check } from 'lucide-react';
import { SCHOLARSHIPS_DB, calculateLocalMatch } from '../mockData';

const API_BASE = '/api';

function Recommendation({ 
  savedScholarshipIds, toggleSave, setSelectedScholarship, 
  applyForScholarship, appliedScholarshipIds, apiConnected 
}) {
  const [aiInputs, setAiInputs] = useState({
    qualification: 'Intermediate',
    marks: '85',
    category: 'General',
    income: '450000',
    state: 'Maharashtra',
    course: 'Undergraduate',
    gender: 'Female',
    fieldOfStudy: 'STEM'
  });
  
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAiInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const runRecommendation = (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(false);

    if (apiConnected) {
      fetch(`${API_BASE}/recommendations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qualification: aiInputs.qualification,
          marks: parseFloat(aiInputs.marks) || 0,
          category: aiInputs.category,
          income: parseFloat(aiInputs.income) || 0,
          state: aiInputs.state,
          course: aiInputs.course,
          gender: aiInputs.gender,
          fieldOfStudy: aiInputs.fieldOfStudy
        })
      })
        .then(res => res.json())
        .then(data => {
          // backend returns match data sorted
          setRecommendations(data);
          setLoading(false);
          setHasSearched(true);
        })
        .catch(err => {
          console.error("Backend Recommendation API failed. Falling back to local scoring: ", err);
          runLocalRecommendation();
        });
    } else {
      setTimeout(() => {
        runLocalRecommendation();
      }, 1000);
    }
  };

  const runLocalRecommendation = () => {
    const computed = SCHOLARSHIPS_DB.map(sch => {
      return calculateLocalMatch(aiInputs, sch);
    });
    // Sort desc by percentage
    const sorted = computed.sort((a, b) => b.matchPercentage - a.matchPercentage);
    setRecommendations(sorted);
    setLoading(false);
    setHasSearched(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-xs sm:text-sm font-semibold text-primary-600">
          <Cpu className="w-4 h-4 animate-spin text-primary-500" />
          <span>Artificial Intelligence Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Personalized Match Recommender</h1>
        <p className="text-slate-500 text-sm">
          Enter your credentials details below. Our AI computes compliance scoring based on weights and gives detailed reason metrics.
        </p>
      </div>

      {/* AI Form Panel */}
      <form onSubmit={runRecommendation} className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-left shadow-premium">
        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center space-x-2 pb-3 border-b border-slate-100">
          <User className="w-5 h-5 text-primary-600" />
          <span>Academic & Demographic Credentials</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Academic Qualification</label>
            <select name="qualification" value={aiInputs.qualification} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="10th">10th Standard</option>
              <option value="Intermediate">12th Standard / Intermediate</option>
              <option value="Undergraduate">Undergraduate Degree</option>
              <option value="Postgraduate">Postgraduate Degree</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Percentage / CGPA (Scale of 100%)</label>
            <input 
              type="number" 
              name="marks" 
              value={aiInputs.marks} 
              onChange={handleInputChange}
              placeholder="Enter CGPA or percentage (e.g. 85)"
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Target Course</label>
            <select name="course" value={aiInputs.course} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="Diploma">Diploma Course</option>
              <option value="Undergraduate">Undergraduate (B.Tech, B.Sc, B.A)</option>
              <option value="Postgraduate">Postgraduate (M.Tech, MBA, M.Sc)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Field of Study</label>
            <select name="fieldOfStudy" value={aiInputs.fieldOfStudy} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="STEM">STEM (Engineering, Science, IT)</option>
              <option value="Arts/Humanities">Arts / Humanities</option>
              <option value="Commerce">Commerce / Business</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Social Category</label>
            <select name="category" value={aiInputs.category} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="General">General Merit</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
              <option value="OBC">OBC (Other Backward Classes)</option>
              <option value="Minority">Minority Community</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Annual Family Income (₹)</label>
            <input 
              type="number" 
              name="income" 
              value={aiInputs.income} 
              onChange={handleInputChange}
              placeholder="Enter household annual income"
              className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current State</label>
            <select name="state" value={aiInputs.state} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Other">Other States</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gender</label>
            <select name="gender" value={aiInputs.gender} onChange={handleInputChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Transgender / Other</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button 
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold px-10 py-4 rounded-xl shadow-premium hover:shadow-premium-hover transition duration-200 flex items-center space-x-3 disabled:opacity-50">
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing Credentials...</span>
              </>
            ) : (
              <>
                <Cpu className="w-5 h-5" />
                <span>Compute Matches</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* AI Loading Simulator */}
      {loading && (
        <div className="max-w-xl mx-auto py-12 space-y-6">
          <p className="text-slate-500 font-semibold animate-pulse text-center">Checking 25,000+ national and private guidelines...</p>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div className="bg-primary-500 h-full rounded-full animate-[progress_1s_ease-in-out_infinite]" style={{width: '60%'}}></div>
          </div>
        </div>
      )}

      {/* AI Results */}
      {hasSearched && !loading && (
        <div className="space-y-8 pt-6">
          <h2 className="text-2xl font-bold text-slate-800 text-left border-b border-slate-200 pb-3">Recommended Matches for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendations.map(sch => (
              <div 
                key={sch.id}
                className="bg-white border border-slate-200 hover:border-primary-200 rounded-2xl p-6 text-left flex flex-col justify-between shadow-premium hover:shadow-premium-hover transition-all duration-300 relative overflow-hidden">
                {/* Color badge for match strength */}
                <div className="absolute top-0 right-0 h-1.5 bg-gradient-to-r from-primary-400 to-primary-600" style={{width: `${sch.matchPercentage}%`}}></div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    {/* Gauge */}
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-black text-primary-600">{sch.matchPercentage}%</span>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Match</span>
                    </div>
                    <button 
                      onClick={() => toggleSave(sch.id)}
                      className="text-slate-400 hover:text-primary-500 transition">
                      <Bookmark 
                        className="w-5 h-5" 
                        fill={savedScholarshipIds.includes(sch.id) ? "currentColor" : "none"} 
                      />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <h3 onClick={() => setSelectedScholarship(sch)} className="font-bold text-slate-800 text-base sm:text-lg leading-snug hover:text-primary-600 cursor-pointer transition line-clamp-2">
                      {sch.name}
                    </h3>
                    <p className="text-slate-400 text-xs">{sch.provider}</p>
                  </div>

                  {/* Recommendation Reason alert box */}
                  <div className="bg-primary-50/55 border border-primary-100/50 rounded-xl p-3.5 text-xs text-primary-950 font-medium leading-relaxed">
                    <strong className="text-primary-700 block mb-0.5">Recommendation Basis:</strong>
                    {sch.recommendationReason}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider block">Award Amount</span>
                    <span className="text-base sm:text-lg font-bold text-primary-600">{sch.amount}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedScholarship(sch)}
                      className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 transition">
                      Details
                    </button>
                    <button 
                      onClick={() => applyForScholarship(sch.id)}
                      disabled={appliedScholarshipIds.includes(sch.id)}
                      className={`font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition ${appliedScholarshipIds.includes(sch.id) ? 'bg-slate-100 text-slate-400 border border-slate-200' : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg'}`}>
                      {appliedScholarshipIds.includes(sch.id) ? 'Applied' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendation;
