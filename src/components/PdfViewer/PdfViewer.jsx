import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setLoading(false);
    }

    return (
        <div className="flex flex-col items-center gap-6 p-4 bg-slate-100 rounded-3xl border border-slate-200 shadow-inner max-h-[80vh] overflow-hidden">
            <div className="w-full flex items-center justify-between px-4 bg-white py-3 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                        disabled={pageNumber <= 1}
                        className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white disabled:opacity-30 transition-all font-bold text-sm"
                    >
                        Prev
                    </button>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-widest">
                        Page {pageNumber} of {numPages || '...'}
                    </p>
                    <button
                        onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                        disabled={pageNumber >= numPages}
                        className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-900 hover:text-white disabled:opacity-30 transition-all font-bold text-sm"
                    >
                        Next
                    </button>
                </div>

                <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100"
                >
                    Open Full
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>

            <div className="w-full overflow-y-auto scrollbar-hide bg-slate-200/50 rounded-2xl border border-slate-200/50 p-4 transition-all duration-500">
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-600/20 border-t-indigo-600"></div>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-tighter">Preparing PDF...</p>
                        </div>
                    }
                    error={
                        <div className="text-center py-24 px-6">
                            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-black text-slate-900 mb-2">Failed to load document</h3>
                            <p className="text-sm text-slate-500 max-w-[250px] mx-auto">The PDF link might be incorrect or have restricted access.</p>
                        </div>
                    }
                >
                    <Page
                        pageNumber={pageNumber}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        width={window.innerWidth < 640 ? 300 : 550}
                        className="shadow-2xl mx-auto rounded-lg overflow-hidden"
                    />
                </Document>
            </div>
        </div>
    );
};

export default PdfViewer;
