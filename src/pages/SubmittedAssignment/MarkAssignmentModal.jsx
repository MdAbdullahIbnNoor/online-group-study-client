import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import PdfViewer from '../../components/PdfViewer/PdfViewer';
import { API_URL } from '../../api/config';

Modal.setAppElement('#root'); // Specify the root element for accessibility

const MarkAssignmentModal = ({ assignment }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`${API_URL}/myAssignment/markUpdate/${assignment._id}`, {
        status: 'completed',
        markGiven: marks,
        feedBack: feedback
      }, {
        withCredentials: true
      });
      if (response.data.acknowledged) {
        Swal.fire({
          title: 'Success!',
          text: 'Assignment Mark Given Successfully',
          icon: 'success',
          confirmButtonText: 'Cool',
        });
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }

    closeModal();
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 p-6 border border-slate-100 transition-all hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner bg-slate-100">
          <img className="w-full h-full object-cover" src={assignment.photoURL} alt={assignment.title} />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-extrabold text-slate-900 mb-1">{assignment.title}</h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium text-slate-500 mb-3">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {assignment.submittedBy}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Marks: {assignment.marks}
            </span>
          </div>
        </div>

        <button
          onClick={openModal}
          className="btn-premium-primary !py-3 !px-8 text-sm whitespace-nowrap"
        >
          Evaluate Work
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal-premium-content !max-w-6xl !w-[95%]"
        overlayClassName="modal-premium-overlay"
      >
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 flex flex-col lg:flex-row h-full max-h-[90vh]">
          {/* PDF Preview Area */}
          <div className="lg:w-3/5 bg-slate-50 border-r border-slate-100 flex flex-col min-h-[400px]">
            <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between">
              <h4 className="text-lg font-black text-slate-900">Submission Preview</h4>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">Live View</span>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              <PdfViewer pdfUrl={assignment.pdfLink} />
            </div>
          </div>

          {/* Submission Info & Marking Form */}
          <div className="lg:w-2/5 flex flex-col overflow-y-auto">
            <div className="bg-indigo-600 p-8 text-white relative">
              <h3 className="text-2xl font-black mb-1">Marking Panel</h3>
              <p className="text-indigo-100 text-xs opacity-80 uppercase tracking-widest font-bold">Grading {assignment.title}</p>

              <button onClick={closeModal} className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors">
                <svg className="w-6 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8 space-y-8 flex-1">
              {/* Student Notes */}
              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 block mb-2">Student's Note</label>
                <p className="text-slate-700 text-sm italic">"{assignment.additionalText || 'No additional notes provided.'}"</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Score</label>
                    <span className="text-[10px] font-bold text-slate-400">MAX: {assignment.marks}</span>
                  </div>
                  <input
                    type="number"
                    max={assignment.marks}
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    placeholder="Enter marks obtained..."
                    className="w-full premium-input h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 uppercase tracking-wider">Feedback</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Briefly explain the grade..."
                    className="w-full premium-input h-28 resize-none"
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-4 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] btn-premium-primary !py-4 text-sm shadow-xl shadow-indigo-100"
                  >
                    Complete Grade
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MarkAssignmentModal;
