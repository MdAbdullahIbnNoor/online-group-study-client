import React from 'react';
import { useState, useEffect } from 'react';
import { initReveal } from '../../utils/reveal';

const FeatureSection = () => {
    const [data, setData] = useState({ features: [] });

    useEffect(() => {
        fetch('features.json')
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);
                // Trigger reveal after a short delay to ensure DOM is updated
                setTimeout(() => {
                    initReveal();
                }, 100);
            })
            .catch((error) => {
                console.error('Error fetching JSON data:', error);
            });
    }, []);

    return (
        <section className="py-24 bg-white">
            <div className="container px-6 mx-auto">
                <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
                    <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase transition-all duration-300 hover:tracking-[0.2em] cursor-default">
                        Why Choose Us
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900">
                        Discover Our Key Features
                    </h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Explore the powerful tools and features designed to make collaborative learning efficient, engaging, and rewarding.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {data.features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 bg-slate-50 rounded-2xl border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 scroll-reveal"
                        >
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3">
                                {feature.Feature}
                            </h4>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {feature.Description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
