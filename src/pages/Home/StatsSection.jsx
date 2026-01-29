import React from 'react';

const StatsSection = () => {
    const stats = [
        { label: 'Active Students', value: '15,000+', icon: 'users', color: 'indigo' },
        { label: 'Assignments Created', value: '45,000+', icon: 'document-text', color: 'emerald' },
        { label: 'Study Resources', value: '1,200+', icon: 'library', color: 'amber' },
        { label: 'Success Rate', value: '98%', icon: 'trending-up', color: 'rose' }
    ];

    return (
        <section className="relative z-10 -mt-16 container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="group bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 hover:-translate-y-2 scroll-reveal"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-6 group-hover:bg-${stat.color}-600 group-hover:text-white transition-all duration-300 transform group-hover:rotate-12`}>
                            {stat.icon === 'users' && (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                            {stat.icon === 'document-text' && (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            )}
                            {stat.icon === 'library' && (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                </svg>
                            )}
                            {stat.icon === 'trending-up' && (
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            )}
                        </div>
                        <h4 className="text-3xl font-black text-slate-900 mb-1">{stat.value}</h4>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
