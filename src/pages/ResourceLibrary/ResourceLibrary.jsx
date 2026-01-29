import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import PdfViewer from '../../components/PdfViewer/PdfViewer';
import { API_URL } from '../../api/config';

Modal.setAppElement('#root');

const ResourceLibrary = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previewPdf, setPreviewPdf] = useState(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const res = await axios.get(`${API_URL}/resources`, {
                    params: { search: searchTerm, type: filter }
                });
                setResources(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching resources:", error);
                setLoading(false);
            }
        };
        fetchResources();
    }, [searchTerm, filter]);

    const openPreview = (url) => setPreviewPdf(url);
    const closePreview = () => setPreviewPdf(null);



    if (loading && resources.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-16">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        Study <span className="text-indigo-600">Resource Library</span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                        Explore community-contributed materials to boost your learning journey. Free, open, and collaborative.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 mb-12 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search resources by title..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        {['All', 'PDF', 'Video', 'Article'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type.toLowerCase())}
                                className={`px-6 py-4 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${filter === type.toLowerCase()
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <button className="btn-premium-primary !py-4 !px-8 whitespace-nowrap">
                        Share Resource
                    </button>
                </div>

                {/* Resource Grid */}
                {resources.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {resources.map((res) => (
                            <div key={res._id || res.id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-100 transition-all group">
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${res.type === 'PDF' ? 'bg-red-50 text-red-600' :
                                            res.type === 'Video' ? 'bg-blue-50 text-blue-600' :
                                                'bg-emerald-50 text-emerald-600'
                                            }`}>
                                            {res.type}
                                        </span>
                                        <span className="text-xs font-bold text-slate-400">{res.date}</span>
                                    </div>

                                    <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">{res.title}</h3>
                                    <p className="text-sm text-slate-500 font-medium mb-6">{res.category} • {res.author}</p>

                                    <div className="flex gap-2">
                                        {res.type === 'PDF' && (
                                            <button
                                                onClick={() => openPreview(res.link)}
                                                className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all"
                                            >
                                                Preview
                                            </button>
                                        )}
                                        <a
                                            href={res.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`${res.type === 'PDF' ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 py-4 bg-slate-50 rounded-2xl text-slate-700 font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all`}
                                        >
                                            {res.type === 'Video' ? 'Watch' : 'Access'}
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-24 text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">No matching resources</h3>
                        <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                    </div>
                )}
            </div>

            {/* PDF Preview Modal */}
            <Modal
                isOpen={!!previewPdf}
                onRequestClose={closePreview}
                className="modal-premium-content !max-w-4xl"
                overlayClassName="modal-premium-overlay"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-slate-900">Document Preview</h2>
                    <button onClick={closePreview} className="p-2 bg-slate-100 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <PdfViewer pdfUrl={previewPdf} />
            </Modal>
        </div>
    );
};

export default ResourceLibrary;
