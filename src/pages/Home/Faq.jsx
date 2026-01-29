import React from 'react'


const Faq = () => {
    const faqs = [
        {
            question: "How can I create assignments on this platform?",
            answer: "To create assignments, log in to your account and navigate to the 'Create Assignment' page. Fill in the required details such as title, description, marks, and due date. Click 'Submit' to create your assignment."
        },
        {
            question: "Can I update or delete assignments I've created?",
            answer: "Yes, you can update assignments you've created. Go to the 'My Assignments' page, find the assignment you want to update, and click 'Edit.' To delete an assignment, visit the 'My Assignments' page and click 'Delete' next to the assignment."
        },
        {
            question: "How do I grade assignments from my friends?",
            answer: "To grade assignments from your friends, visit the 'Submitted Assignments' page. Click on the assignment you want to grade, provide marks and feedback, and click 'Submit.' The status of the assignment will be changed to 'Completed.'"
        },
        {
            question: "Is there a mobile app available for this platform?",
            answer: "Currently, we offer a web application that is fully responsive and works on mobile devices. You can access our platform on your smartphone or tablet using a web browser."
        },
        {
            question: "How can I contact support if I encounter issues?",
            answer: "If you encounter any issues or have questions, you can reach out to our support team through the 'Contact Us' page. We are here to assist you with any problems or inquiries you may have."
        }
    ];

    return (
        <section className="py-24 bg-slate-50 rounded-3xl my-20 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/3">
                        <h2 className="text-sm font-bold tracking-widest text-indigo-600 uppercase mb-4">
                            Support
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                            Common Questions & Answers
                        </h3>
                        <p className="text-lg text-slate-600 mb-8">
                            Everything you need to know about StudyBridge. Can't find the answer you're looking for? Reach out to our support team.
                        </p>
                        <button className="btn-premium-outline">
                            Contact Support
                        </button>
                    </div>

                    <div className="lg:w-2/3 space-y-4">
                        {faqs.map((faq, index) => (
                            <details
                                key={index}
                                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 open:ring-2 open:ring-indigo-100 open:border-indigo-200 scroll-reveal"
                            >
                                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                                    <span className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                        {faq.question}
                                    </span>
                                    <span className="ml-4 flex-shrink-0 transition-transform duration-300 group-open:rotate-180">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq