import React from 'react';

const ProcessSection = () => {
    const steps = [
        {
            title: "Join the Community",
            description: "Create an account and connect with thousands of motivated students worldwide.",
            icon: "1"
        },
        {
            title: "Share or Solve",
            description: "Post your own assignments for peer review or help others by grading their work.",
            icon: "2"
        },
        {
            title: "Grow Together",
            description: "Gain insights from feedback, earn reputation, and master your subjects collaboratively.",
            icon: "3"
        }
    ];

    return (
        <section className="py-24 bg-slate-900 overflow-hidden">
            <div className="container px-6 mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
                    <h2 className="text-sm font-bold tracking-[0.3em] text-indigo-400 uppercase">
                        Our Process
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-black text-white">
                        How StudyBridge Works
                    </h3>
                    <p className="text-lg text-slate-400">
                        A simple, three-step journey to collaborative academic success.
                    </p>
                </div>

                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="group flex flex-col items-center text-center scroll-reveal"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="w-20 h-20 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-3xl font-black mb-8 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-xl shadow-indigo-900/20">
                                    {step.icon}
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                                    {step.title}
                                </h4>
                                <p className="text-slate-400 leading-relaxed max-w-xs mx-auto">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
