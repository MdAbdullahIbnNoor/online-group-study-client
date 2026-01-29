import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../../api/config';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        created: 0,
        submitted: 0,
        pending: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch unified stats
                const statsRes = await axios.get(`${API_URL}/dashboard-stats`, { withCredentials: true });
                setStats(statsRes.data);

                // Fetch recent submissions for activity list
                const activityRes = await axios.get(`${API_URL}/myAssignment/filterbyemail`, {
                    params: { email: user?.email },
                    withCredentials: true
                });
                setRecentActivity(activityRes.data.slice(0, 5));

                setLoading(false);
            } catch (error) {
                console.error("Dashboard fetch error:", error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchDashboardData();
        }
    }, [user?.email]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-16">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">My Dashboard</h1>
                        <p className="text-slate-500">Welcome back, <span className="text-indigo-600 font-bold">{user?.displayName || 'Student'}</span>! Here's your study progress.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/createassignment" className="btn-premium-primary text-sm !py-3">Create New</Link>
                        <Link to="/assignment" className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all text-sm">Browse Tasks</Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {[
                        {
                            label: 'Assignments Created', val: stats.created, color: 'indigo', icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            )
                        },
                        {
                            label: 'My Submissions', val: stats.submitted, color: 'emerald', icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )
                        },
                        {
                            label: 'Pending Evaluations', val: stats.pending, color: 'amber', icon: (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            )
                        }
                    ].map((stat, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-6">
                            <div className={`w-16 h-16 rounded-2xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600`}>
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {stat.icon}
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-3xl font-black text-slate-900">{stat.val}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Submissions */}
                    <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-900">Recent Submissions</h3>
                            <Link to="/myAssignment" className="text-sm font-bold text-indigo-600 hover:underline">View All</Link>
                        </div>
                        <div className="p-4">
                            {recentActivity.length > 0 ? (
                                <div className="space-y-2">
                                    {recentActivity.map((activity, idx) => (
                                        <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{activity.title}</p>
                                                    <p className="text-xs text-slate-500">Submitted on {activity.dueDate}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${activity.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                                }`}>
                                                {activity.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <p className="text-slate-400 italic">No recent activity found.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Profile */}
                    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 text-center flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full border-4 border-indigo-100 p-1 mb-6">
                            <img
                                src={user?.photoURL || 'https://i.pravatar.cc/150'}
                                className="w-full h-full rounded-full object-cover"
                                alt="Profile"
                            />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">{user?.displayName}</h3>
                        <p className="text-sm text-slate-500 mb-6">{user?.email}</p>

                        <div className="w-full space-y-3">
                            <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Rank</span>
                                <span className="font-black text-indigo-600">#42</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Reputation</span>
                                <span className="font-black text-indigo-600">850</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
