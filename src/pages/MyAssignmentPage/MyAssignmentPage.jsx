import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';

const MyAssignmentPage = () => {
    const { user } = useContext(AuthContext)
    const [myAssignmentData, setMyAssignmentData] = useState([])

    const fetchData = async () => {
        try {
          const response = await axios.get('https://online-group-study-server-nu.vercel.app/myAssignment/filterbyemail', {
            params: {
              email: user?.email
            },
            withCredentials: true // Move withCredentials inside the request config
          });
      
          const filteredData = response.data;
          setMyAssignmentData(filteredData);
        } catch (error) {
          console.error('Error fetching pending assignment', error);
        }
      };
      
      useEffect(() => {
        fetchData();
      }, []);
      

    return (
        <div className='max-w-screen-2xl mx-auto my-20'>
            <h1 className='text-center font-bold text-4xl mb-10 mt-4'>Assignment Submitted By <span className='text-indigo-600'>{user?.email}</span></h1>
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                <h2 className="mb-4 text-2xl font-semibold leadi text-gray-800">Invoices</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-md">
                        <colgroup>
                            <col style={{ width: 'auto' }} />
                            <col style={{ width: 'auto' }} />
                            <col style={{ width: 'auto' }} />
                            <col style={{ width: '55px' }} />
                            <col style={{ width: 'auto' }} />
                            <col style={{ width: '24px' }} />
                        </colgroup>
                        <thead className="dark:bg-gray-800">
                            <tr className="text-left">
                                <th className="p-6 font-bold text-md">Title</th>
                                <th className="p-6 font-bold text-md">PDF Link</th>
                                <th className="p-6 font-bold text-md">Due Date</th>
                                <th className="p-6 font-bold text-md">Mark Obtained</th>
                                <th className="p-6 font-bold text-md text-right">Feedback</th>
                                <th className="p-6 font-bold text-md">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myAssignmentData.map((assignment) => <tr key={assignment._id} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                                    <td className="p-5">
                                        <p>{assignment.title}</p>
                                    </td>
                                    <td className="p-5">
                                        <p>{assignment.pdfLink}</p>
                                    </td>
                                    <td className="p-5">
                                        <p>{assignment.dueDate}</p>
                                        {/* <p className="dark:text-gray-400">Friday</p> */}
                                    </td>
                                    <td className="p-5">
                                        <p className='font-bold text-violet-500'>{assignment.markGiven}</p>
                                    </td>
                                    <td className="p-5 text-right">
                                        <p>{assignment.feedBack}</p>
                                    </td>
                                    <td className="p-5 text-right">
                                        <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
                                            <span>{assignment.status}</span>
                                        </span>
                                    </td>
                                </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyAssignmentPage;
