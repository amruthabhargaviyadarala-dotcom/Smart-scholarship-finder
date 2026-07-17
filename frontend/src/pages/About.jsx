import React from 'react';
import { Cpu, Check } from 'lucide-react';

function About({ setCurrentPage }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 text-left">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">About Smart Scholarship Finder</h1>
        <p className="text-slate-500 text-lg">We bridge the gap between academic aspiration and educational funding.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">The Scholarship Searching Problem</h2>
          <p className="text-slate-600 leading-relaxed">
            Every year, billions of rupees in educational scholarship grants remain unutilized because students simply do not know they qualify. Searching is highly complex:
          </p>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start space-x-2">
              <span className="text-red-500 font-bold mt-0.5">✗</span>
              <span>Information is scattered across dozens of government and private website portals.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 font-bold mt-0.5">✗</span>
              <span>Complex rules make it hard to confirm if CGPA, gender, or state criteria are met.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-red-500 font-bold mt-0.5">✗</span>
              <span>Important application dates pass unnoticed due to lack of reminders.</span>
            </li>
          </ul>
        </div>
        <div className="bg-gradient-to-tr from-primary-100 to-primary-50 rounded-3xl p-8 border border-primary-200 flex flex-col justify-center space-y-6">
          <h2 className="text-2xl font-bold text-primary-800">Our Smart Solution</h2>
          <p className="text-primary-900 leading-relaxed text-sm">
            **Smart Scholarship Finder** unifies all national and international scholarship sources into a single database. Our AI tool compares student parameters instantly to deliver high-probability recommendations.
          </p>
          <button 
            onClick={() => setCurrentPage('ai')} 
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition flex items-center justify-center space-x-2 w-fit">
            <Cpu className="w-5 h-5" />
            <span>Try Recommendation System</span>
          </button>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-16 space-y-8">
        <h2 className="text-3xl font-bold text-slate-800 text-center">Benefits For Students</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Save Hours of Searching</h3>
            <p className="text-slate-500 text-sm">No need to read individual pages; the system checks constraints in milliseconds.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Estimate Real Probability</h3>
            <p className="text-slate-500 text-sm">See matching weights based on qualifications, income levels, and categories.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-lg">Zero Document Surprise</h3>
            <p className="text-slate-500 text-sm">Pre-formatted document checklist panels ensure you hold required drafts early.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
