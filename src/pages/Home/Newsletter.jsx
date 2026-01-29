import React from 'react';

const Newsletter = () => {
    return (
        <section className="py-24 container mx-auto px-6 scroll-reveal">
            <div className="bg-indigo-600 rounded-[3rem] p-8 md:p-16 lg:p-24 relative overflow-hidden shadow-2xl shadow-indigo-900/20">
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-20 -translate-y-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -translate-x-20 translate-y-20 blur-3xl"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-sm font-bold tracking-[0.4em] text-indigo-200 uppercase">
                        Stay Updated
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        Fuel Your Academic Journey
                    </h3>
                    <p className="text-xl text-indigo-100 max-w-2xl mx-auto opacity-90 leading-relaxed">
                        Join our community of students and get the latest assignments and resources directly in your inbox.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
                        <input
                            type="email"
                            placeholder="Enter your email address..."
                            className="w-full sm:w-96 px-8 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-4 focus:ring-white/10 transition-all text-lg"
                        />
                        <button className="w-full sm:w-48 bg-white text-indigo-600 px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl text-sm">
                            Subscribe
                        </button>
                    </div>
                    <p className="text-xs text-indigo-200 font-medium">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
