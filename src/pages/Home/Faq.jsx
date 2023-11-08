import React from 'react'


const Faq = () => {
    return (
        <section className="bg-indigo-500 text-white rounded-xl my-20">
            <div className="container mx-auto flex flex-col justify-center px-4 py-8 md:p-8">
                <h2 className="text-3xl font-semibold sm:text-4xl">FAQ - Online Group Study</h2>
                <p className="mt-4 mb-8">
                    Explore common questions about our online group study platform.
                </p>
                <div className="space-y-4">
                    <details className="w-full border rounded-lg">
                        <summary className="px-4 py-3 focus:outline-none focus-visible:ring ring-blue-500">
                            How can I create assignments on this platform?
                        </summary>
                        <p className="px-4 py-3 ml-4">
                            To create assignments, log in to your account and navigate to the 'Create Assignment' page. Fill in the required details such as title, description, marks, and due date. Click 'Submit' to create your assignment.
                        </p>
                    </details>
                    <details className="w-full border rounded-lg">
                        <summary className="px-4 py-3 focus:outline-none focus-visible:ring ring-blue-500">
                            Can I update or delete assignments I've created?
                        </summary>
                        <p className="px-4 py-3 ml-4">
                            Yes, you can update assignments you've created. Go to the 'My Assignments' page, find the assignment you want to update, and click 'Edit.' To delete an assignment, visit the 'My Assignments' page and click 'Delete' next to the assignment.
                        </p>
                    </details>
                    <details className="w-full border rounded-lg">
                        <summary className="px-4 py-3 focus:outline-none focus-visible:ring ring-blue-500">
                            How do I grade assignments from my friends?
                        </summary>
                        <p className="px-4 py-3 ml-4">
                            To grade assignments from your friends, visit the 'Submitted Assignments' page. Click on the assignment you want to grade, provide marks and feedback, and click 'Submit.' The status of the assignment will be changed to 'Completed.'
                        </p>
                    </details>
                    <details className="w-full border rounded-lg">
                        <summary className="px-4 py-3 focus:outline-none focus-visible:ring ring-blue-500">
                            Is there a mobile app available for this platform?
                        </summary>
                        <p className="px-4 py-3 ml-4">
                            Currently, we offer a web application that is fully responsive and works on mobile devices. You can access our platform on your smartphone or tablet using a web browser.
                        </p>
                    </details>
                    <details className="w-full border rounded-lg">
                        <summary className="px-4 py-3 focus:outline-none focus-visible:ring ring-blue-500">
                            How can I contact support if I encounter issues?
                        </summary>
                        <p className="px-4 py-3 ml-4">
                            If you encounter any issues or have questions, you can reach out to our support team through the 'Contact Us' page. We are here to assist you with any problems or inquiries you may have.
                        </p>
                    </details>
                </div>
            </div>
        </section>
    )
}

export default Faq