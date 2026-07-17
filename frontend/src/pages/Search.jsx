import React, { useState, useEffect, useMemo } from 'react';
import { Filter, Search as SearchIcon, Bookmark } from 'lucide-react';
import { SCHOLARSHIPS_DB } from '../mockData';

const API_BASE = '/api';

function Search({ savedScholarshipIds, toggleSave, setSelectedScholarship, apiConnected }) {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    searchQuery: '',
    qualification: 'All',
    currentCourse: 'All',
    category: 'All',
    annualIncome: '',
    state: 'All',
    fieldOfStudy: 'All',
    type: 'All'
  });

  // Fetch from backend if connected, else use mock local data
  useEffect(() => {
    if (apiConnected) {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchFilters.searchQuery) params.append('search', searchFilters.searchQuery);
      if (searchFilters.qualification !== 'All') params.append('qualification', searchFilters.qualification);
      if (searchFilters.currentCourse !== 'All') params.append('current_course', searchFilters.currentCourse);
      if (searchFilters.category !== 'All') params.append('category', searchFilters.category);
      if (searchFilters.annualIncome) params.append('max_income', searchFilters.annualIncome);
      if (searchFilters.state !== 'All') params.append('state', searchFilters.state);
      if (searchFilters.fieldOfStudy !== 'All') params.append('field_of_study', searchFilters.fieldOfStudy);
      if (searchFilters.type !== 'All') params.append('scholarship_type', searchFilters.type);

      fetch(`${API_BASE}/scholarships?${params.toString()}`)
        .then(res => res.json())
        .then(data => {
          setScholarships(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Fetch failed, reverting to local filters: ", err);
          runLocalFilters();
          setLoading(false);
        });
    } else {
      runLocalFilters();
    }
  }, [searchFilters, apiConnected]);

  const runLocalFilters = () => {
    const filtered = SCHOLARSHIPS_DB.filter(sch => {
      if (searchFilters.searchQuery) {
        const q = searchFilters.searchQuery.toLowerCase();
        const textMatch = sch.name.toLowerCase().includes(q) || 
                          sch.provider.toLowerCase().includes(q) || 
                          sch.description.toLowerCase().includes(q);
        if (!textMatch) return false;
      }
      if (searchFilters.qualification !== 'All' && sch.qualification !== 'All' && sch.qualification !== searchFilters.qualification) {
        return false;
      }
      if (searchFilters.currentCourse !== 'All' && sch.currentCourse !== 'All' && sch.currentCourse !== searchFilters.currentCourse) {
        return false;
      }
      if (searchFilters.category !== 'All' && sch.category !== 'All' && !sch.category.includes(searchFilters.category)) {
        return false;
      }
      if (searchFilters.annualIncome) {
        const income = parseFloat(searchFilters.annualIncome);
        if (income > sch.maxIncome) return false;
      }
      if (searchFilters.state !== 'All' && sch.state !== 'All' && sch.state !== searchFilters.state) {
        return false;
      }
      if (searchFilters.fieldOfStudy !== 'All' && sch.fieldOfStudy !== 'All' && sch.fieldOfStudy !== searchFilters.fieldOfStudy) {
        return false;
      }
      if (searchFilters.type !== 'All' && sch.type !== 'All' && sch.type !== searchFilters.type) {
        return false;
      }
      return true;
    });
    setScholarships(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setSearchFilters({
      searchQuery: '',
      qualification: 'All',
      currentCourse: 'All',
      category: 'All',
      annualIncome: '',
      state: 'All',
      fieldOfStudy: 'All',
      type: 'All'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-left mb-8 space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Scholarship Database</h1>
        <p className="text-slate-500 text-sm">Explore verified scholarships. Use criteria filters below to match requirements.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 h-fit space-y-6 text-left shadow-sm">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <span className="font-bold text-slate-900 flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter Criteria</span>
            </span>
            <button onClick={clearFilters} className="text-xs text-primary-600 font-bold hover:text-primary-700">
              Reset All
            </button>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Academic Qualification</label>
              <select name="qualification" value={searchFilters.qualification} onChange={handleFilterChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option value="All">All Qualifications</option>
                <option value="10th">10th Pass</option>
                <option value="Intermediate">12th/Intermediate Pass</option>
                <option value="Undergraduate">Undergraduate Degree</option>
                <option value="Postgraduate">Postgraduate Degree</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Current Course</label>
              <select name="currentCourse" value={searchFilters.currentCourse} onChange={handleFilterChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option value="All">All Courses</option>
                <option value="Diploma">Diploma Courses</option>
                <option value="Undergraduate">Undergraduate Courses</option>
                <option value="Postgraduate">Postgraduate Courses</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Annual Income Limit (Max)</label>
              <input 
                type="number" 
                name="annualIncome" 
                value={searchFilters.annualIncome} 
                onChange={handleFilterChange}
                placeholder="Enter max income" 
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Social Category</label>
              <select name="category" value={searchFilters.category} onChange={handleFilterChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option value="All">All Categories</option>
                <option value="General">General Merit</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
                <option value="Minority">Minority Communities</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Field of Study</label>
              <select name="fieldOfStudy" value={searchFilters.fieldOfStudy} onChange={handleFilterChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option value="All">All Fields</option>
                <option value="STEM">STEM (Sci, Tech, Eng, Math)</option>
                <option value="Arts/Humanities">Arts & Humanities</option>
                <option value="Commerce">Business/Commerce</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Scholarship Type</label>
              <select name="type" value={searchFilters.type} onChange={handleFilterChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option value="All">All Types</option>
                <option value="Merit">Merit-Based</option>
                <option value="Means">Means-Based (Income)</option>
                <option value="Merit-cum-Means">Merit-cum-Means</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">State</label>
              <select name="state" value={searchFilters.state} onChange={handleFilterChange} className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option value="All">All States</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Results list */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
              <SearchIcon className="w-5 h-5" />
            </span>
            <input 
              type="text" 
              name="searchQuery"
              value={searchFilters.searchQuery}
              onChange={handleFilterChange}
              placeholder="Search by scholarship title, provider name, key requirements..."
              className="w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 shadow-sm text-sm sm:text-base"
            />
          </div>

          {/* Counter */}
          <div className="text-left text-sm text-slate-500 font-semibold">
            {loading ? "Searching opportunities..." : `Found ${scholarships.length} scholarships matching selection`}
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
              <div className="bg-white p-8 rounded-2xl h-48 animate-pulse border border-slate-100"></div>
              <div className="bg-white p-8 rounded-2xl h-48 animate-pulse border border-slate-100"></div>
            </div>
          ) : scholarships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scholarships.map(sch => (
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
          ) : (
            <div className="bg-white border border-slate-100 rounded-2xl py-16 px-4 text-center space-y-4 shadow-sm">
              <div className="h-16 w-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <SearchIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No Scholarships Found</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                Try adjusting your search terms or relaxing criteria filters to expand search scopes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
