import { useState, useEffect } from 'react';
import axios from 'axios';

const Assignments = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/assignment')
            .then((response) => {
                setAssignments(response.data);
            });
    }, []);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignments.map((assignment) => (
                <div key={assignment._id} className="bg-white rounded p-4 shadow">
                    <h2 className="text-xl font-semibold">{assignment.title}</h2>
                    <p>{assignment.description}</p>
                    <p>Marks: {assignment.marks}</p>
                    <p>Difficulty Level: {assignment.difficultyLevel}</p>
                    <p>Due Date: {assignment.dueDate}</p>
                    <img src={assignment.photoURL} alt={assignment.title} />
                </div>
            ))}
        </div>
    );
};

export default Assignments