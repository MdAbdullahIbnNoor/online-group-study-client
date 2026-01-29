import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const QuickAssist = () => {
    const [isOpen, setIsOpen] = useState(false);

    const actions = [
        {
            name: 'Dashboard', path: '/dashboard', icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            )
        },
        {
            name: 'Create', path: '/createassignment', icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            )
        },
        {
            name: 'Library', path: '/resources', icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            )
        },
    ];

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
            {/* Action Menu */}
            <div className={`flex flex-col gap-3 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-50 pointer-events-none'}`}>
                {actions.map((action, idx) => (
                    <Link
                        key={idx}
                        to={action.path}
                        className="flex items-center gap-3 group"
                        onClick={() => setIsOpen(false)}
                    >
                        <span className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-xl">
                            {action.name}
                        </span>
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-2xl border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-indigo-600 hover:text-white transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {action.icon}
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 ${isOpen ? 'bg-slate-900 text-white rotate-[135deg]' : 'bg-indigo-600 text-white shadow-indigo-200'}`}
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    );
};

export default QuickAssist;
