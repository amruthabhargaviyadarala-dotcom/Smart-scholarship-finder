import React, { useState } from 'react';
import { Bookmark, Clock, Check, FileText, Globe, DollarSign } from 'lucide-react';

function Details({ scholarship, onClose, isSaved, isApplied, onToggleSave, onApply }) {
  const [activeTab, setActiveTab] = useState('description');

  // Convert comma-separated string back to array if needed
  const docsList = typeof scholarship.documents === 'string' 
    ? scholarship.documents.split(',') 
    : (scholarship.documents || []);

  const formattedDate = new Date(scholarship.last_date || scholarship.lastDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col text-left animate-[scaleIn_0.2s_ease-out]">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-primary-700 to-primary-500 p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl font-bold bg-white/10 w-9 h-9 rounded-full flex items-center justify-center transition">
            ×
          </button>
          <div className="space-y-2 pr-10">
            <span className="inline-flex px-2.5 py-0.5 text-xs rounded-full bg-white/20 text-white font-semibold">
              {scholarship.type}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold leading-tight">{scholarship.name}</h2>
            <p className="text-white/80 text-xs sm:text-sm">{scholarship.provider}</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b border-slate-200 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('description')}
            className={`px-6 py-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === 'description' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
            Description
          </button>
          <button 
            onClick={() => setActiveTab('eligibility')}
            className={`px-6 py-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === 'eligibility' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
            Eligibility & Benefits
          </button>
          <button 
            onClick={() => setActiveTab('documents')}
            className={`px-6 py-4 font-bold text-xs sm:text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === 'documents' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>
            Documents Checklist
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto flex-grow space-y-4 text-slate-600 text-sm leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-800 text-base">Scope & Overview</h3>
                <p>{scholarship.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center space-x-3">
                  <DollarSign className="w-8 h-8 text-primary-600" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Award Fund</span>
                    <span className="font-bold text-slate-800 text-base">{scholarship.amount}</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-red-500" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Last Date to Apply</span>
                    <span className="font-bold text-red-500 text-base">{formattedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'eligibility' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-800 text-base">Eligibility Criteria</h3>
                <ul className="space-y-2 list-disc pl-4 text-slate-600">
                  <li>Academic Requirement: Minimum of {scholarship.min_percentage || scholarship.minPercentage || ((scholarship.min_cgpa || scholarship.minCGPA) * 10)}% marks or {scholarship.min_cgpa || scholarship.minCGPA} CGPA in previous examinations.</li>
                  <li>Qualification Level: Suitable for {scholarship.qualification} candidates pursuing {scholarship.current_course || scholarship.currentCourse} courses.</li>
                  {(scholarship.max_income || scholarship.maxIncome) !== 999999999 && (
                    <li>Financial Limits: Annual household family income must be under ₹{(scholarship.max_income || scholarship.maxIncome).toLocaleString()}.</li>
                  )}
                  {scholarship.gender !== 'All' && (
                    <li>Gender Limit: Exclusive for {scholarship.gender} candidates.</li>
                  )}
                  {scholarship.state !== 'All' && (
                    <li>Location: Restricted to students originating/residing in {scholarship.state}.</li>
                  )}
                </ul>
              </div>
              <div className="space-y-2 pt-2">
                <h3 className="font-bold text-slate-800 text-base">Financial Benefits</h3>
                <p className="bg-emerald-50 text-emerald-950 border border-emerald-100 rounded-xl p-4">
                  {scholarship.benefits}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-800 text-base">Required Documents Checklist</h3>
              <p className="text-slate-400 text-xs">Verify you hold clear scan prints of following documents before initiating portal application drafts.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {docsList.map((doc, idx) => (
                  <div key={idx} className="flex items-center space-x-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <FileText className="text-primary-600 w-5 h-5" />
                    <span className="font-semibold text-xs sm:text-sm text-slate-700">{doc}</span>
                  </div>
                ))}
              </div>
              {scholarship.official_website || scholarship.officialWebsite ? (
                <div className="pt-4 flex items-center space-x-2 text-xs text-slate-500">
                  <Globe className="w-4 h-4" />
                  <span>Apply directly at: </span>
                  <a href={scholarship.official_website || scholarship.officialWebsite} target="_blank" rel="noopener noreferrer" className="text-primary-600 font-bold hover:underline">
                    {scholarship.official_website || scholarship.officialWebsite}
                  </a>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 flex justify-between items-center gap-4 bg-slate-50">
          <button 
            onClick={onToggleSave}
            className="flex items-center space-x-2 px-5 py-3 border border-slate-200 rounded-xl text-slate-600 hover:text-primary-600 hover:bg-slate-100 font-bold transition">
            <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          <div className="flex space-x-3">
            <button 
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition">
              Close
            </button>
            <button 
              onClick={onApply}
              disabled={isApplied}
              className={`px-8 py-3 rounded-xl font-bold transition flex items-center space-x-2 shadow-md ${isApplied ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-lg'}`}>
              <Check className="w-5 h-5" />
              <span>{isApplied ? 'Applied' : 'Apply Now'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
