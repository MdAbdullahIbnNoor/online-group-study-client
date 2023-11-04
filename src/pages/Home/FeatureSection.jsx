import { useState, useEffect } from 'react';

const FeatureSection = () => {

    const [data, setData] = useState({ features: [] });

    useEffect(() => {
        // Fetch the JSON data from the features.json file
        fetch('features.json')
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);
            })
            .catch((error) => {
                console.error('Error fetching JSON data:', error);
            });
    }, []);

    return (
        <div className="">
            <dl className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold sm:text-4xl text-indigo-800">Discover Our Key Features</h2>
                    <p className="mt-4 text-lg">Explore the features that make our product exceptional</p>
                </div>
                <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
                    {/* Feature Cards */}
                    {data.features.map((feature, index) => (
                        <div className="flex " key={index}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="flex-shrink-0 w-6 h-6 dark:text-violet-400">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <div className="ml-3">
                                <h3 className="text-lg font-semibold text-indigo-800">{feature.Feature}</h3>
                                <p className="mt-2">{feature.Description}</p>
                            </div>
                        </div>
                    ))}
                </dl>
            </dl>
        </div>
    );
};

export default FeatureSection;
